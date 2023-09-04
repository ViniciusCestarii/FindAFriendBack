import { PetsRepository } from "@/repositories/petsRepository";
import { ResourceNotFound } from "../errors/resourceNotFound";

export class DeletePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string): Promise<void> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFound();
    }

    await this.petsRepository.delete(id);
  }
}
