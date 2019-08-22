import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const LinkList = styled.ul`
  position: absolute;
  border: 1px solid black;
  background-color: papayawhip;

  padding: 10px;
  width: 70px;
  margin: 0;

  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
`;

const LinkListItem = styled.li`
  list-style: none;
`;

const LinkWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 5px;

  &:hover ${LinkList} {
    visibility: visible;
    opacity: 1;
  }
`;

const Navigation = () => (
  <Wrapper>
    <LinkWrapper>
      <Link to="/">Count▼</Link>
      <LinkList>
        <LinkListItem>
          <Link to="/by/1">By 1</Link>
        </LinkListItem>
        <LinkListItem>
          <Link to="/by/2">By 2</Link>
        </LinkListItem>
        <LinkListItem>
          <Link to="/by/3">By 3</Link>
        </LinkListItem>
        <LinkListItem>
          <Link to="/by/5">By 5</Link>
        </LinkListItem>
        <LinkListItem>
          <Link to="/by/8">By 8</Link>
        </LinkListItem>
      </LinkList>
    </LinkWrapper>
    <LinkWrapper>
      <Link to="/about/">About</Link>
    </LinkWrapper>
  </Wrapper>
);
export default Navigation;
