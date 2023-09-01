import { fase } from "@/types/petTypes";
import { $Enums } from "@prisma/client";
import dayjs from "dayjs";

interface getPetFaseRequest {
  birthDate: Date,
  specie: $Enums.Specie
}

export const getPetFase = ({ birthDate, specie }: getPetFaseRequest) => {
  const ageInMonths = getAgeInMonths(birthDate)
  switch (specie) {
    case "DOG":
      return getDogFase(ageInMonths);
    case "CAT":
      return getCatFase(ageInMonths);
    case "BIRD":
      return getBirdFase(ageInMonths);
    case "RODENT":
      return getRodentFase(ageInMonths);
    case "REPTILE":
      return getReptileFase(ageInMonths);
    default:
      return false; // Unknown species
  }
}

export const getAgeInMonths = (birthDate: Date): number => {
  const currentDate = dayjs();
  const formattedBirthDate = dayjs(birthDate, 'YYYY-MM-DD');
  const ageInMonths = currentDate.diff(formattedBirthDate, 'month', true);
  return ageInMonths;
}

const getDogFase = (ageInMonths: number): fase => {
  if (ageInMonths >= 0 && ageInMonths <= 2) {
    return "BABY";
  }
  else if (ageInMonths >= 3 && ageInMonths <= 24) {
    return "YOUNG";
  }
  else if (ageInMonths >= 25 && ageInMonths <= 144) {
    return "ADULT";
  }
  else {
    return "SENIOR";
  }
}

const getCatFase = (ageInMonths: number): fase => {
  if (ageInMonths >= 0 && ageInMonths <= 2) {
    return "BABY";
  }
  else if (ageInMonths >= 3 && ageInMonths <= 24) {
    return "YOUNG";
  }
  else if (ageInMonths >= 25 && ageInMonths <= 144) {
    return "ADULT";
  }
  else {
    return "SENIOR";
  }
}

const getBirdFase = (ageInMonths: number): fase => {
  if (ageInMonths >= 0 && ageInMonths <= 1.5) {
    return "BABY";
  }
  else if (ageInMonths >= 1.3 && ageInMonths <= 11) {
    return "YOUNG";
  }
  else if (ageInMonths >= 12 && ageInMonths <= 36) {
    return "ADULT";
  }
  else {
    return "SENIOR";
  }
}

const getRodentFase = (ageInMonths: number): fase => {
  if (ageInMonths >= 0 && ageInMonths <= 0.5) {
    return "BABY";
  }
  else if (ageInMonths >= 0.6 && ageInMonths <= 1.5) {
    return "YOUNG";
  }
  else if (ageInMonths >= 1.6 && ageInMonths <= 4) {
    return "ADULT";
  }
  else {
    return "SENIOR";
  }
}

const getReptileFase = (ageInMonths: number): fase => {
  if (ageInMonths >= 0 && ageInMonths <= 2) {
    return "BABY";
  }
  else if (ageInMonths >= 3 && ageInMonths <= 6) {
    return "YOUNG";
  }
  else if (ageInMonths >= 6 && ageInMonths <= 60) {
    return "ADULT";
  }
  else {
    return "SENIOR";
  }
}

