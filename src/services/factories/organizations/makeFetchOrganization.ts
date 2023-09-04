import { PrismaOrganizationsRepository } from "@/repositories/prisma/prismaOrganizationsRepository";
import { FetchOrganizationtionService } from "@/services/organizations/fetchOrganization";

export const makeFetchOrganizationtionService = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const service = new FetchOrganizationtionService(
    prismaOrganizationsRepository,
  );

  return service;
};
