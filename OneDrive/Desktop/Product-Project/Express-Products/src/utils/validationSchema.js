// export const createUserValidationSchema = {
//     user_name:{
//         notEmpty:{
//             errorMessage: "User name is required"
//         },
//         isLength:{
//             options:{min:3,max:20},
//             errorMessage: "User name should be between 3 and 20 characters"
//         }
//     },
//     password:{
//         notEmpty:{
//             errorMessage: "Password should be filled"
//         },
//     }
// }

export const createUserValidationSchema = {
  user_name: {
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username should be between 3 and 20 characters",
    },
    notEmpty: {
      errorMessage: "Username is required",
    },
  },

  email: {
    isEmail: {
      errorMessage: "Invalid Email",
    },
    normalizeEmail: true,
    notEmpty: {
      errorMessage: "Email is required",
    },
  },

  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 characters",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },

  role: {
    isIn: {
      options: [["user", "admin"]],
      errorMessage: "Role must be user or admin",
    },
  },
};

export const createProductValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title is required",
    },
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "Title must be between 3 and 100 characters",
    },
  },

  description: {
    notEmpty: {
      errorMessage: "Description is required",
    },
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "Description must contain at least 5 characters",
    },
  },
  
  image: {
  notEmpty: {
    errorMessage: "Image URL is required",
  },
}
};