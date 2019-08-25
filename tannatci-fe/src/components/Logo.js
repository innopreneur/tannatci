import React from "react";
import logo from "../assets/logo.svg";
import { Container, Image } from "react-bootstrap";
import "./Logo.css";

export default function Logo() {
  return (
      <Image className="logo-container" src={logo} />
  );
}
