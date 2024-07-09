$("#formValidation").validate({
  rules: {
    name: {
      minlength: 2,
    },
    email: true,
  },
  messages: {
    name: {
      required: "Please Enter Your Name",
      minlength: "Name at least 2 characters",
    },
    email: "Please Enter Youe Email",
  },

  submitHandler: function (form) {
    form.submit();
  },
});
