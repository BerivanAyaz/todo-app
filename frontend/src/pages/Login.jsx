import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Spin } from "antd";

import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const { isError, isLoading, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      navigate("/");
    }

    if (isSuccess) {
      toast.success("Login successful");
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, navigate, message, dispatch]);

  const onFinish = (values) => {
    const { email, password } = values;
    if (!email || !password) {
      return toast.error("Please add all fields!");
    }
    dispatch(login({ email, password }));
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 450,
        margin: "100px auto",
        padding: "20px",
      }}
    >
      {isLoading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <h1>Login</h1>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" placeholder="Your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Your password" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "rgb(224, 171, 67)",
                borderColor: "rgb(224, 171, 67)",
              }}
            >
              Login
            </Button>
          </Form>
        </>
      )}
    </Card>
  );
};

export default Login;
