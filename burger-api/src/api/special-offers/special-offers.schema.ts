import * as yup from 'yup';

const newSchema = yup.object().shape<{ multiplier: number }>(
  {
    multiplier: yup.number().required().min(0).max(1)
  }
);

export default { newSchema };
