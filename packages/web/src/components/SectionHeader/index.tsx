import React from 'react';

import { useHistory } from 'react-router-dom';

import './styles.css';
import { BsArrowLeftShort } from 'react-icons/bs';
import logomark from '../../assets/images/logos/logomark.svg';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = props => {
  const { title } = props;
  const history = useHistory();

  function handleReturnToPreviousPage(): void {
    return history.goBack();
  }

  return (
    <header id="section-header">
      <BsArrowLeftShort onClick={handleReturnToPreviousPage} />
      <h2 id="title">{title}</h2>
      <img id="logomark" src={logomark} alt="Cookit!" />
    </header>
  );
};

export default SectionHeader;
