const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false }); // abortEarly: false collects all errors

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  next();
};

export { validate };