import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ServicesService } from './modules/services/services.service';
import { PackagesService } from './modules/packages/packages.service';
import { AddonsService } from './modules/addons/addons.service';
import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const logger = new Logger('SeedScript');
  logger.log('🌱 Starting Database Seeding...');

  const app = await NestFactory.createApplicationContext(ApiModule);

  const servicesService = app.get(ServicesService);
  const packagesService = app.get(PackagesService);
  const addonsService = app.get(AddonsService);

  // 1. Clear existing data (optional, but good for fresh seeds)
  logger.log('Clearing existing catalog data...');
  const db = mongoose.connection;
  await db.collection('services').deleteMany({});
  await db.collection('packages').deleteMany({});
  await db.collection('addons').deleteMany({});

  // 2. Seed Services
  logger.log('Seeding Services...');
  const weddingService = await servicesService.create({
    name: 'Wedding Photography',
    description: 'Capture your special day with our premium wedding photography services.',
    slug: 'wedding-photography',
    basePrice: 15000,
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    isActive: true,
  });

  const corporateService = await servicesService.create({
    name: 'Corporate Events',
    description: 'Professional coverage for your corporate seminars, parties, and offsites.',
    slug: 'corporate-events',
    basePrice: 8000,
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    isActive: true,
  });

  const portraitService = await servicesService.create({
    name: 'Personal Portraits',
    description: 'High-quality personal portraits for modeling, family, or social media.',
    slug: 'personal-portraits',
    basePrice: 4000,
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    isActive: true,
  });

  // 3. Seed Packages
  logger.log('Seeding Packages...');
  await packagesService.create({
    serviceId: weddingService._id.toString(),
    name: 'Silver Wedding Package',
    description: '4 hours of coverage, 1 photographer, 100 edited photos.',
    price: 15000,
    durationMinutes: 240,
    deliverables: ['100 High-Res Edited Photos', 'Online Gallery'],
    isActive: true,
  });

  await packagesService.create({
    serviceId: weddingService._id.toString(),
    name: 'Gold Wedding Package',
    description: '8 hours of coverage, 2 photographers, 300 edited photos, 1 cinematic video.',
    price: 35000,
    durationMinutes: 480,
    deliverables: ['300 High-Res Edited Photos', '1 Cinematic Highlight Video', 'Premium Photo Album', 'Online Gallery'],
    isActive: true,
  });

  await packagesService.create({
    serviceId: corporateService._id.toString(),
    name: 'Half-Day Corporate Coverage',
    description: '4 hours of professional event coverage.',
    price: 8000,
    durationMinutes: 240,
    deliverables: ['Unlimited Raw Photos', '50 Edited Highlights'],
    isActive: true,
  });

  await packagesService.create({
    serviceId: portraitService._id.toString(),
    name: 'Standard Portrait Session',
    description: '2 hour outdoor portrait session.',
    price: 4000,
    durationMinutes: 120,
    deliverables: ['15 Retouched Photos', '2 Outfit Changes'],
    isActive: true,
  });

  // 4. Seed Addons
  logger.log('Seeding Addons...');
  await addonsService.create({
    name: 'Drone Photography',
    description: 'Add aerial drone shots to your package.',
    price: 5000,
    isActive: true,
  });

  await addonsService.create({
    name: 'Extra Photographer',
    description: 'Hire an additional photographer for more coverage.',
    price: 8000,
    isActive: true,
  });

  await addonsService.create({
    name: 'Express Delivery (48 Hours)',
    description: 'Get your edited photos delivered within 48 hours guaranteed.',
    price: 3000,
    isActive: true,
  });

  logger.log('✅ Database Seeding Completed Successfully!');
  await app.close();
  process.exit(0);
}

bootstrap();
