"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <StyledButton onClick={handleClick}>
      <div className="content">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
        </svg>
        <p>Log In</p>
      </div>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 128px;
  height: 48px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .content {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: white;
    font-weight: 600;
  }

  svg {
    color: white;
  }
`;

export default LoginButton;