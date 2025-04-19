// Confirming the password reset
export const confirmResetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/confirm-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const message = await response.text();
    return message;
  } catch (err) {
    throw new Error(err);
  }
};

// Request to reset the users password
export const resetPassword = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const message = await response.text();
    return message;
  } catch (err) {
    throw new Error(err);
  }
};

// Grabbing information to set user context (username, email)
export const getUserContext = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/user-context`,
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  // Checking response
  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  // Returning user context
  const data = await response.json();
  return data;
};

// Logging user out
export const logoutUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  // Checking response
  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  // Logout worked
  return true;
};

// Retrieiving all the general data from user
export const fetchGeneralData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get general data");
  }

  const data = await response.json();
  console.log("General Data", data);

  return data;
};

// Fetching Security data from the user
export const fetchSecurityData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/security`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
      },
      credentials: "include",
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
      },
      credentials: "include",
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
    credentials: "include",
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
      body: JSON.stringify({ name }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update name");
  }
  return response.text();
};

// Updating users username
export const updateUserUsername = async (username) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-username`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update username");
  }
  return response.text();
};

// Updating users email
export const updateUserEmail = async (email) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update email");
  }
  return response.text();
};

// Updating users language preference
export const updateUserLanguage = async (language) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences/update-language`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(language),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update language preference");
  }
  return response.text();
};

// Updating users date format preference
export const updateDateFormat = async (dateFormat) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences/update-date-format`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateFormat),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update date format preference");
  }
  return response.text();
};

// Updating users time zone preference
export const updateTimeZone = async (timeZone) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/preferences/update-time-zone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeZone),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update time zone preference");
  }
  return response.text();
};
