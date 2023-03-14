import {ErrorMessage, Field, FieldArray, Form} from "formik";
import {AlertRuleForm} from "./AlertRuleForm";
import React from "react";
import {GrInfo, GrTrigger} from "react-icons/gr";
import {Button, Card, CardBody, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {MdPriorityHigh} from "react-icons/md";
import {TbLogicNand} from "react-icons/tb";
import {AsyncPaginate} from "react-select-async-paginate";
import {api} from "../../api";

export const AlertRuleChannelForm = (props) => {
  const {formik} = props
  const {values, touched, errors, setFieldValue} = formik;

  async function loadOptions(search, loadedOptions) {
    const {data} = await api.destination.find({
      limit: 10,
      skip: loadedOptions.length
    })

    return {
      options: data.items.map((item) => {
        return (
          {
            value: item.id,
            label: item.label
          }
        )
      }),
      hasMore: loadedOptions.length < data.total
    };
  }

  return (
    <Form>
      <div>
        <AsyncPaginate
          value={values.destination_ids}
          loadOptions={loadOptions}
          isMulti
          closeMenuOnSelect={false}
          onChange={(value) => {
            setFieldValue("destination_ids", value)
          }}
        />
      </div>
      <AlertRuleForm formik={formik} />
    </Form>
  )
}
