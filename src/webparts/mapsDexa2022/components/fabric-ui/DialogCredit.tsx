import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption, ActionButton, Label, Checkbox, DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles, Panel, PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
import { WindowPopUp } from '../utils/utils';
import styles from '../MapsDexa2022.module.scss';

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
];
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: "Crédit épuisé.",
  subText: '',
};

export const DialogCredit: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <h3>Votre crédit est épuisé. Pour avoir un crédit illimite ou pour plus d'information veuiller contacter votre fournisseur.</h3>
      </Dialog>
    </>
  );
};
