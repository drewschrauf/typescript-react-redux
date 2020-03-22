import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const DropdownLink = styled(Link)`
  &:after {
    content: '▼';
  }
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

const Navigation: React.FC = () => (
  <Wrapper>
    <LinkWrapper>
      <DropdownLink to="/">Count</DropdownLink>
      <LinkList>
        {[1, 2, 3, 5, 8].map((increment) => (
          <LinkListItem key={increment}>
            <Link to={`/by/${increment}`}>By {increment}</Link>
          </LinkListItem>
        ))}
      </LinkList>
    </LinkWrapper>
    <LinkWrapper>
      <Link to="/about/">About</Link>
    </LinkWrapper>
  </Wrapper>
);
export default Navigation;
