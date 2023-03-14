import * as yup from "yup";

export const subscriptionSchema = yup.object().shape({
  label: yup.string().required('Required'),
  logic: yup.string().required('Required'),
  levels: yup.array().of(yup.string()),
  priorities: yup.array().of(yup.string()),
  rules: yup.array()
    .of(
      yup.object().shape({
        key: yup.string().required('Required'),
        type: yup.string().required('Required'),
        operator: yup.string().required('Required'),
        value: yup.string().required('Required'),
      })
    ),
});
