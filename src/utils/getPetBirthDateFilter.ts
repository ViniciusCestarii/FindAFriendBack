import { fase } from "@/types/petTypes";
import { $Enums } from "@prisma/client";
import dayjs from "dayjs";

interface getPetBirthDateFilterRequest {
  fase: fase;
  specie: $Enums.Specie;
}

interface getSpecieFilterReturn {
  gte?: Date;
  lte?: Date;
}

export const getPetBirthDateFilter = ({
  fase,
  specie,
}: getPetBirthDateFilterRequest) => {
  switch (specie) {
    case "DOG":
      return getDogfilter(fase);
    case "CAT":
      return getCatfilter(fase);
    case "BIRD":
      return getBirdfilter(fase);
    case "RODENT":
      return getRodentfilter(fase);
    case "REPTILE":
      return getReptilefilter(fase);
    case "FISH":
      return getFishfilter(fase);
    default:
      return undefined; // Unknown species
  }
};

const subtractMonthsFromToday = (monthsToSubtract: number) => {
  return dayjs().subtract(monthsToSubtract, "month").toDate();
};

const getDogfilter = (fase: fase): getSpecieFilterReturn => {
  if (fase === "BABY") {
    return {
      gte: subtractMonthsFromToday(2),
      lte: new Date(),
    };
  } else if (fase === "YOUNG") {
    return {
      gte: subtractMonthsFromToday(24),
      lte: subtractMonthsFromToday(2),
    };
  } else if (fase === "ADULT") {
    return {
      gte: subtractMonthsFromToday(144),
      lte: subtractMonthsFromToday(24),
    };
  } else {
    return {
      lte: subtractMonthsFromToday(144),
    };
  }
};

const getCatfilter = (fase: fase): getSpecieFilterReturn => {
  if (fase === "BABY") {
    return {
      gte: subtractMonthsFromToday(2),
      lte: new Date(),
    };
  } else if (fase === "YOUNG") {
    return {
      gte: subtractMonthsFromToday(24),
      lte: subtractMonthsFromToday(2),
    };
  } else if (fase === "ADULT") {
    return {
      gte: subtractMonthsFromToday(144),
      lte: subtractMonthsFromToday(24),
    };
  } else {
    return {
      lte: subtractMonthsFromToday(144),
    };
  }
};

const getBirdfilter = (fase: fase): getSpecieFilterReturn => {
  if (fase === "BABY") {
    return {
      gte: subtractMonthsFromToday(1.5),
      lte: new Date(),
    };
  } else if (fase === "YOUNG") {
    return {
      gte: subtractMonthsFromToday(11),
      lte: subtractMonthsFromToday(1.5),
    };
  } else if (fase === "ADULT") {
    return {
      gte: subtractMonthsFromToday(36),
      lte: subtractMonthsFromToday(11),
    };
  } else {
    return {
      lte: subtractMonthsFromToday(36),
    };
  }
};

const getRodentfilter = (fase: fase): getSpecieFilterReturn => {
  if (fase === "BABY") {
    return {
      gte: subtractMonthsFromToday(0.5),
      lte: new Date(),
    };
  } else if (fase === "YOUNG") {
    return {
      gte: subtractMonthsFromToday(1.5),
      lte: subtractMonthsFromToday(0.5),
    };
  } else if (fase === "ADULT") {
    return {
      gte: subtractMonthsFromToday(4),
      lte: subtractMonthsFromToday(1.5),
    };
  } else {
    return {
      lte: subtractMonthsFromToday(4),
    };
  }
};

const getReptilefilter = (fase: fase): getSpecieFilterReturn => {
  if (fase === "BABY") {
    return {
      gte: subtractMonthsFromToday(0.5),
      lte: new Date(),
    };
  } else if (fase === "YOUNG") {
    return {
      gte: subtractMonthsFromToday(3),
      lte: subtractMonthsFromToday(0.5),
    };
  } else if (fase === "ADULT") {
    return {
      gte: subtractMonthsFromToday(60),
      lte: subtractMonthsFromToday(3),
    };
  } else {
    return {
      lte: subtractMonthsFromToday(60),
    };
  }
};

const getFishfilter = (fase: fase): getSpecieFilterReturn => {
  if (fase === "BABY") {
    return {
      gte: subtractMonthsFromToday(0.2),
      lte: new Date(),
    };
  } else if (fase === "YOUNG") {
    return {
      gte: subtractMonthsFromToday(3),
      lte: subtractMonthsFromToday(0.2),
    };
  } else if (fase === "ADULT") {
    return {
      gte: subtractMonthsFromToday(24),
      lte: subtractMonthsFromToday(3),
    };
  } else {
    return {
      lte: subtractMonthsFromToday(24),
    };
  }
};
