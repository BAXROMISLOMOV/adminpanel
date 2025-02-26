import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import { useState } from "react";
import useAuthstore from "../store/my-store";

function Adduser() {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useAuthstore();

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        type="primary"
      >
        Qoshish
      </Button>
      <Drawer
        title={"Kitobxon qoshish"}
        open={isOpen}
        closeIcon={null}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Form
          onFinish={(values) => {
            console.log(values);
            values.phone.toString();
            axios
              .post("https://library.softly.uz/api/users",
               {...values,phone:values.phone.toString()}, 
               {
                headers: { Authorization: `Bearer ${authState.token}` },
              })
              .then((res) => {
                console.log(res.data);
                setIsOpen(false)
                message.success("qoshildi")

                
              })
              .catch((e)=>{
                console.log(e);
                message.error("xatolik")
                
              })
          }}
        >
          <Form.Item
            label="ism"
            name={"firstName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Familiya"
            name={"lastName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon raqami"
            name={"phone"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="jinsi"
            name={"gender"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              block
              options={[
                {
                  label: "Erkak",
                  value: "male",
                },
                {
                  label: "Ayol",
                  value: "female",
                },
              ]}
              optionType="button"
              htmlType="submit"
              type="primary"
            ></Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block
            htmlType="submit"
            >
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Adduser;
