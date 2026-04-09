import React, { JSX } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {COLORS} from '../../constants';
import { ViewStyle } from 'react-native';

interface AccordionComponentProps {
  sections: any[];
  renderHeader: (section: any, index: number, isActive: boolean) => JSX.Element;
  renderContent: (
    section: any,
    index: number,
    isActive: boolean,
  ) => JSX.Element;
  expandMultiple?: boolean;
  oneExpand?: boolean;
  containerStyle?:ViewStyle
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({
  sections,
  renderHeader,
  renderContent,
  expandMultiple,
  oneExpand,
  containerStyle,
}) => {
  const [activeSections, setActiveSections] = React.useState(
    oneExpand ? [0] : [],
  );

  const updateSections = (activeSections: number[]) => {
    setActiveSections(activeSections);
  };
  return (
    <Accordion
      // sectionContainerStyle={containerStyle}
      sections={sections}
      onChange={updateSections}
      renderHeader={renderHeader}
      underlayColor={COLORS.transparent}
      renderContent={renderContent}
      expandMultiple={expandMultiple}
      activeSections={activeSections}
      containerStyle={containerStyle}
    />
  );
};

export default AccordionComponent;
