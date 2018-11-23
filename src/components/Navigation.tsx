import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const LinkWrapper = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const Navigation = () => (
  <Wrapper>
    <LinkWrapper>
      <Link to="/">Home</Link>
    </LinkWrapper>
    <LinkWrapper>
      <Link to="/about/">About</Link>
    </LinkWrapper>
  </Wrapper>
);
export default Navigation;
