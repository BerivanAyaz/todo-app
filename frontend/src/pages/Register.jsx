import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button, Card, Spin, Row, Col } from "antd";

import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Registration Successful");
      navigate("/");
    }
    if (user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onFinish = (values) => {
    const { name, email, password, password2 } = values;
    if (!name || !email || !password || !password2) {
      return toast.error("Please add all fields!");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match!");
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card
          style={{
            padding: "20px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "450px",
            margin: "100px auto",
          }}
        >
          {isLoading ? (
            <Spin tip="Loading..." />
          ) : (
            <>
              <h1 style={{ textAlign: "center" }}>Register</h1>
              <Form onFinish={onFinish}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input placeholder="Your name" />
                </Form.Item>
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
                <Form.Item
                  label="Confirm Password"
                  name="password2"
                  rules={[{ required: true, message: "Please confirm your password!" }]}
                >
                  <Input.Password placeholder="Confirm your password" />
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
                  Register
                </Button>
              </Form>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
