import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import { useState } from "react";
import useAuthstore from "../store/my-store";

function Adduser() {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useAuthstore();
  const[loading , setLoading] = useState (false)

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
        onClose={() => {
          setIsOpen(false);
        }}
        closeIcon={null}
        open={isOpen}
        destroyOnClose
      >
        <Form
        
          onFinish={(values) => {
            setLoading (true)
            axios
              .post(
                `https://library.softly.uz/api/users`,
                { ...values, phone: values.phone.toString() },
                {
                  headers: {
                    Authorization: `Bearer ${authState.token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
              })
              .catch((e) => {
                console.error(e);
                message.error("Xatolik");

              });
            setisOpen(false);
            loading (false)
          }}
        >
          <Form.Item
            label="Ism"
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
            label="Familya"
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
            label="Telefon raqam"
            name={"phone"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Jinsi"
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
              defaultValue="Apple"
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Qoshish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

    </>
  );
}

export default Adduser;
