import React from 'react';
import type { FC } from 'react';
import './skillBlock.css';

type skillBlockProps = {
  value: string;
};

const SkillBlock: FC<skillBlockProps> = ({ value }) => {
  const skills = value.split(',').filter((item) => item !== '');

  return (
    <div className='skillBlock-container'>
      {skills.map((skill, index) => (
        <div className='value-tag' key={index}>
          {skill}
        </div>
      ))}
    </div>
  );
};

export default SkillBlock;
