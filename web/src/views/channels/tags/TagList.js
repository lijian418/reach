import {useEffect, useState} from "react";
import useAsyncEffect from "use-async-effect";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle, CardText,
  CardTitle,
} from "reactstrap";
import Pagination from "react-js-pagination";
import {cilTrash} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {useNavigate} from "react-router-dom";
import {api} from "../../../api";
import EditTagModal from "./EditTagModal";
import {channel} from "../../../api/channel";

export const TagList = (props) => {
  return (
    <>
      <div className={'d-flex gap-3 flex-wrap'}>
        {
          props.channel && props.channel.tags && props.channel.tags.map((tag) => {
            return (
              <Card style={{width: '25rem', minWidth: '300px'}} key={tag.id}>
                <CardBody>
                  <CardTitle tag="h5">
                    {tag.slug}
                  </CardTitle>
                  <div className={'d-flex flex-row-reverse'}>
                    <div className={'d-flex gap-2 flex-wrap'}>
                      <Button color={'danger'} className={'mr-2'}>
                        <CIcon icon={cilTrash} size="sm"/> Delete
                      </Button>
                      <EditTagModal channel={channel} tag={tag} refetch={props.refetch}/>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
          })
        }
        {
          props.channel && props.channel.tags.length === 0 && (
            <p>No tags</p>
          )
        }
      </div>
    </>
  )
}
