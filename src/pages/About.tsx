/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

const readme = require('../../README.md');

const Wrapper = styled.div`
  a {
    display: none;
  }
`;

const AboutPage = () => <Wrapper dangerouslySetInnerHTML={{ __html: readme }} />;
export default AboutPage;
