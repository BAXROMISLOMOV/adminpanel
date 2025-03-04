import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import React, { useState } from "react";
import api from "../Api/api";
import useAuthstore from "../store/my-store";

function Login() {
  const [Loading, setLoading] = useState(false);
  return (
    <div className="flex items-center justify-center  g h-full ">
      <Card className=" shadow-blue-700 shadow-lg w-96">
        <Form
          onFinish={(values) => {
            console.log(values);
            setLoading(true);
            api
              .post("/auth/signin", values)
              .then((res) => {
                console.log(res.data);
                api.defaults.headers.Authorization = `Bearer${(s)=>s.token}`;
                useAuthstore.setState({
                  token: res.data.token,
                  user: res.data.user,
                });

                setLoading(false);
                localStorage.setItem("auth", JSON.stringify(res.data));
                message.success("success");
              })
              .catch((e) => {
                console.error(e);
                setLoading(false);
                message.error("xatolik");
              });
          }}
        >
          <Form.Item label="" name={"username"}>
            <Input placeholder="Login" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item label="" name={"password"}>
            <Input.Password
              placeholder="Password"
              prefix={<UnlockOutlined />}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              loading={Loading}
              className="w-20"
              type="primary"
              htmlType="Submit"
              block
            >
              {" "}
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
