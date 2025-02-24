import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useAuthstore from "../store/my-store";

function Login() {
  const [Loading, setLoading] = useState(false);
  return (
    <div className="flex items-center justify-center  mt-90 h-full ">
      <Card className=" shadow-blue-700 shadow-lg w-96">
        <Form
          onFinish={(values) => {
            console.log(values);
            setLoading(true);
            axios
              .post("https://library.softly.uz/auth/signin", values)
              .then((res) => {
                console.log(res.data);
                useAuthstore.setState({
                  token: res.data.token,
                  user: res.data.user,
                });
                setLoading(false);
                message.success("success");
              })
              .catch((e) => {
                console.error(e);
                setLoading(false);
                message.error("xatolik");
              });
          }}
        >
          <Form.Item label="Login" name={"username"}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name={"password"}>
            <Input.Password />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              className="w-20"
              type="primary"
              htmlType="Submit"
              
            >{Loading && <div>loading...</div>} Kirish</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
