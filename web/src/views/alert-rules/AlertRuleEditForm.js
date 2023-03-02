import * as yup from "yup";
import {
  Button,
  FormFeedback,
  Input, Label,
} from "reactstrap";
import {ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext} from "formik";
import React, {useEffect} from "react";
import {api} from "../../api";

export const AlertRuleEditForm = (props) => {
  const schema = yup.object().shape({
    logic: yup.string().required('Required'),
    rules: yup.array()
      .of(
        yup.object().shape({
          key: yup.string().required('Required'),
          type: yup.string().required('Required'),
          operator: yup.string().required('Required'),
          value: yup.string().required('Required'),
        })
      )
  });

  const update = async (values) => {
    const {data} = await api.alertRule.update(props.alertRule.id, {
      logic: values.logic,
      rules: values.rules,
    })
  }

  const FormObserver: React.FC = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      props.setLocalAlertRule(values);
    }, [values]);
    return null;
  };

  return (
    <Formik
      initialValues={{
        logic: props.alertRule.logic,
        rules: props.alertRule.rules,
      }}
      validationSchema={schema}
      onSubmit={(values) => update(values)}
    >
      {({errors, touched, values}) => (
        <Form>
          <FormObserver/>
          <FieldArray
            name="rules"
            render={arrayHelpers => (
              <div>
                <div>
                  <Label for="logic">Logic</Label>
                  <Input
                    style={{width: '130px'}}
                    name={`logic`}
                    type="select"
                    tag={Field}
                    component={"select"}
                  >
                    <option label={'And'}>
                      and
                    </option>
                    <option label={'Or'}>
                      or
                    </option>
                  </Input>
                </div>
                <h3 className={'my-4'}>Rules</h3>
                {values.rules.map((friend, index) => (
                  <div key={index}>
                    <div className={'d-flex gap-4 flex-wrap mt-2'}>
                      <div>
                        <Input
                          style={{width: '200px'}}
                          type="text"
                          name={`rules[${index}].key`}
                          tag={Field}
                        />
                        <FormFeedback>{errors.key}</FormFeedback>
                        <ErrorMessage name={`rules[${index}].key`}/>
                      </div>
                      <div>
                        <Input
                          style={{width: '130px'}}
                          name={`rules[${index}].type`}
                          type="select"
                          tag={Field}
                          component={"select"}
                        >
                          <option label={'Text'}>
                            text
                          </option>
                          <option label={'Number'}>
                            number
                          </option>
                        </Input>
                        <ErrorMessage name={`rules[${index}].type`}/>
                      </div>
                      <div>
                        <Input
                          style={{width: '100px'}}
                          name={`rules[${index}].operator`}
                          type="select"
                          tag={Field}
                          component={"select"}
                        >
                          <option>
                            ==
                          </option>
                          <option>
                            !=
                          </option>
                        </Input>
                        <ErrorMessage name={`rules[${index}].operator`}/>
                      </div>
                      <div>
                        <Input
                          style={{width: '200px'}}
                          type="text"
                          name={`rules[${index}].value`}
                          tag={Field}
                        />
                        <ErrorMessage name={`rules[${index}].value`}/>
                      </div>
                      <div>
                        <Button onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  {
                    typeof errors.rules === 'string' && (
                      <div className={'text-danger'}>
                        {errors.rules}
                      </div>
                    )
                  }
                </div>
                <div className={'d-flex flex-wrap gap-2 mt-2'}>
                  <Button
                    type="button"
                    onClick={() => arrayHelpers.push({ key: '', value: '', type: 'text', operator: '=='})}
                  >
                    + Add
                  </Button>
                  <Button
                    type={'submit'}
                    color={'primary'}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  )
}
