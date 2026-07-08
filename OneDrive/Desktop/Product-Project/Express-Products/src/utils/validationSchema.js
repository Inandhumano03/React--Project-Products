export const createUserValidationSchema = {
    user_name:{
        notEmpty:{
            errorMessage: "User name is required"
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage: "User name should be between 3 and 20 characters"
        }
    },
    password:{
        notEmpty:{
            errorMessage: "Password should be filled"
        },
    }
}

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
};