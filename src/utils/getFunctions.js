import { Facilities, Features, Prefectures } from "./constants/categories";
import { JobType as jobTypes } from "./constants/categories";
import { EmploymentType as employmentTypes } from "./constants/categories/employmenttype";
import { Qualifications as qualifications } from "./constants/categories/qualifications";

export const getPrefectureKeyByValue = (value) => {
  for (const region in Prefectures) {
    for (const key in Prefectures[region]) {
      if (Prefectures[region][key] === value) {
        return key; // Return the key if the value matches
      }
    }
  }
  return null; // Return null if no match is found
};

export const getJobTypeKeyByValue = (value) => {
  for (const category in jobTypes) {
    for (const job in jobTypes[category]) {
      if (jobTypes[category][job] === value) {
        return job; // Return the job key if the value matches
      }
    }
  }
  return null; // Return null if no match is found
};

export const getJobValueByKey = (key) => {
  for (const category in jobTypes) {
    if (jobTypes[category][key]) {
      return jobTypes[category][key]; // Return the job code
    }
  }
  return null; // Return null if jobName is not found
};

export const getJobTypeValue = (jobType, key) => {
  for (const category in jobType) {
    if (jobType[category][key]) {
      return jobType[category][key];
    }
  }
  return null; // Return null if the key is not found
};

export const getEmploymentTypeKeyByValue = (value) => {
  for (const type in employmentTypes) {
    if (employmentTypes[type] === value) {
      return type; // Return the employment type key if the value matches
    }
  }
  return null; // Return null if no match is found
};

export const getQualificationKeyByValue = (value) => {
  for (const category in qualifications) {
    for (const qualification in qualifications[category]) {
      if (qualifications[category][qualification] === value) {
        return qualification; // Return the qualification key if the value matches
      }
    }
  }
  return null; // Return null if no match is found
};

export const getFeatureKeyByValue = (value) => {
  for (const category in Features) {
    for (const feature in Features[category]) {
      if (Features[category][feature] === value) {
        return feature; // Return the feature key if the value matches
      }
    }
  }
  return null; // Return null if no match is found
};

export const getFeatureValueByKey = (featureKey) => {
  // Loop through each category in the Features object
  for (const category in Features) {
    // Check if the category exists in the Features object
    if (Features[category][featureKey]) {
      // Return the corresponding value
      return Features[category][featureKey];
    }
  }

  // If the featureKey doesn't exist, return a message or null
  return null;
};

export const getAllJobTypeValues = () => {
  const values = [];
  for (const category in jobTypes) {
    if (Object.hasOwnProperty.call(jobTypes, category)) {
      values.push(...Object.values(jobTypes[category]));
    }
  }
  return values;
};

export const getAllPrefectureValues = () => {
  const values = [];
  for (const category in Prefectures) {
    if (Object.hasOwnProperty.call(Prefectures, category)) {
      values.push(...Object.values(Prefectures[category]));
    }
  }
  return values;
};

export const getAllFacilityValues = () => Object.values(Facilities);

export const getAllEmploymentValues = () => Object.values(employmentTypes);

export const getAllFeatureValues = () => {
  return Object.values(Features).flatMap((value) =>
    typeof value === "object" ? Object.values(value) : value
  );
};

export const getFacilityKeyByValue = (value) => {
  for (const type in Facilities) {
    if (Facilities[type] === value) {
      return type; // Return the employment type key if the value matches
    }
  }
  return null; // Return null if no match is found
};
