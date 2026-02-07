from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
import resend
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'matheusviniciusdrs5555@gmail.com')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class BookingCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    vehicle_brand: str
    vehicle_model: str
    vehicle_year: str
    service_type: str
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    vehicle_brand: str
    vehicle_model: str
    vehicle_year: str
    service_type: str
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Routes
@api_router.get("/")
async def root():
    return {"message": "Fire Moto API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Booking endpoints
@api_router.post("/bookings", response_model=Booking)
async def create_booking(input: BookingCreate):
    booking_dict = input.model_dump()
    booking_obj = Booking(**booking_dict)
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.bookings.insert_one(doc)
    
    # Send email notification
    if resend.api_key:
        try:
            html_content = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 30px;">
                <h1 style="color: #DC2626; border-bottom: 2px solid #DC2626; padding-bottom: 10px;">🔧 Novo Agendamento - Fire Moto</h1>
                <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h2 style="color: #DC2626; margin-top: 0;">Dados do Cliente</h2>
                    <p><strong>Nome:</strong> {booking_obj.name}</p>
                    <p><strong>Telefone:</strong> {booking_obj.phone}</p>
                    <p><strong>Email:</strong> {booking_obj.email}</p>
                </div>
                <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h2 style="color: #DC2626; margin-top: 0;">Dados do Veículo</h2>
                    <p><strong>Marca:</strong> {booking_obj.vehicle_brand}</p>
                    <p><strong>Modelo:</strong> {booking_obj.vehicle_model}</p>
                    <p><strong>Ano:</strong> {booking_obj.vehicle_year}</p>
                </div>
                <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h2 style="color: #DC2626; margin-top: 0;">Serviço Solicitado</h2>
                    <p><strong>Tipo:</strong> {booking_obj.service_type}</p>
                    <p><strong>Data Preferida:</strong> {booking_obj.preferred_date}</p>
                    <p><strong>Horário:</strong> {booking_obj.preferred_time}</p>
                    {f'<p><strong>Observações:</strong> {booking_obj.message}</p>' if booking_obj.message else ''}
                </div>
                <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
                    Este email foi enviado automaticamente pelo sistema Fire Moto
                </p>
            </div>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [NOTIFICATION_EMAIL],
                "subject": f"Novo Agendamento - {booking_obj.name} - {booking_obj.service_type}",
                "html": html_content
            }
            
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Email notification sent for booking {booking_obj.id}")
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
    
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    for booking in bookings:
        if isinstance(booking.get('created_at'), str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return bookings

# Contact endpoints
@api_router.post("/contact", response_model=Contact)
async def create_contact(input: ContactCreate):
    contact_dict = input.model_dump()
    contact_obj = Contact(**contact_dict)
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    
    return contact_obj

@api_router.get("/contact", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    return contacts

# Services data endpoint
@api_router.get("/services")
async def get_services():
    services = [
        {"id": "1", "name": "Mecânica Geral", "description": "Diagnóstico completo e reparos de motor, câmbio e sistemas mecânicos", "icon": "wrench", "price": "A partir de R$ 150"},
        {"id": "2", "name": "Injeção Eletrônica", "description": "Diagnóstico e reparo de sistemas de injeção eletrônica e sensores", "icon": "cpu", "price": "A partir de R$ 200"},
        {"id": "3", "name": "Suspensão e Freios", "description": "Manutenção e troca de amortecedores, molas, pastilhas e discos", "icon": "car", "price": "A partir de R$ 180"},
        {"id": "4", "name": "Alinhamento e Balanceamento", "description": "Alinhamento 3D computadorizado e balanceamento de rodas", "icon": "target", "price": "A partir de R$ 120"},
        {"id": "5", "name": "Ar Condicionado Automotivo", "description": "Recarga de gás, higienização e reparo do sistema de A/C", "icon": "thermometer", "price": "A partir de R$ 250"},
        {"id": "6", "name": "Elétrica Automotiva", "description": "Diagnóstico e reparo de sistemas elétricos, alternador e bateria", "icon": "zap", "price": "A partir de R$ 130"},
        {"id": "7", "name": "Troca de Óleo e Filtros", "description": "Troca de óleo sintético ou mineral com filtros de qualidade", "icon": "droplet", "price": "A partir de R$ 180"},
        {"id": "8", "name": "Funilaria e Pintura", "description": "Reparos de lataria, pintura automotiva e polimento", "icon": "paintbrush", "price": "Sob consulta"},
        {"id": "9", "name": "Revisão Completa", "description": "Check-up completo com inspeção de todos os sistemas do veículo", "icon": "clipboard-check", "price": "A partir de R$ 350"},
        {"id": "10", "name": "Embreagem e Câmbio", "description": "Troca e reparo de embreagem, câmbio manual e automático", "icon": "cog", "price": "A partir de R$ 400"},
        {"id": "11", "name": "Direção Hidráulica", "description": "Manutenção e reparo de sistemas de direção hidráulica e elétrica", "icon": "circle", "price": "A partir de R$ 200"},
        {"id": "12", "name": "GNV - Gás Natural", "description": "Instalação, manutenção e vistoria de kit GNV", "icon": "flame", "price": "A partir de R$ 2.500"}
    ]
    return services

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
