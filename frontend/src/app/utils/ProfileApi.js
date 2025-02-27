// Retrieiving all the general data from user
export const fetchGeneralData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Example: Add auth token
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get general data");
  }

  const data = await response.json();
  return data;
};

// Fetching Security data from the user
export const fetchSecurityData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/security`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get security data");
  }

  const data = await response.json();
  return data;
};

// Getting all the billing information from a user
export const fetchBillingData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/biling`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get billing data");
  }

  const data = await response.json();
  return data;
};

// Getting all the notifcations information from a user
export const fetchNotifcationData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notification`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get notication data");
  }

  const data = await response.json();
  return data;
};

// Updating users profile picture
export const updateProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/user/update-profile-picture", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update profile image");
  }

  const data = await response.json();
  return data.profilePictureUrl;
};

// Updating the users name
export const updateName = async (name) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-name`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update name");
  }
  return response.json();
};

// Updating users username
export const updateUserUsername = async (username) => {
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-username`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update username");
  }
  return response.json();
};

// Updating users email
export const updateUserEmail = async (email) => {
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update email");
  }
  return response.json();
};

// Updating users language preference
export const updateUserLanguage = async (language) => {
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences/update-language`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(language),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update language preference");
  }
  return response.json();
};

// Updating users date format preference
export const updateDateFormat = async (dateFormat) => {
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences/update-date-format`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateFormat),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update date format preference");
  }
  return response.json();
};

// Updating users time zone preference
export const updateTimeZone = async (timeZone) => {
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences/update-time-zone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeZone),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update time zone preference");
  }
  return response.json();
};
