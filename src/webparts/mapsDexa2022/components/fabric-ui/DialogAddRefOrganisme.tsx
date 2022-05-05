import * as React from 'react';
import { IChoiceGroupOption, Dialog, DialogType } from 'office-ui-fabric-react';
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
  title: "Selectionnez le type de référence!",
  subText: '',
};

export const DialogAddRefOrganisme: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  return (
    <>
      <a className={styles.Pointer} onClick={toggleHideDialog}>Ajouter une référencen</a>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp('Commercial', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x0100A06D80F09251E749B7F38EEE724DBF6D', "l_dexa");}}>Commercial</a>
        <br/>
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp('Professionnel', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x0100E933BD16B27C484895A461EA853B4E01', "l_dexa");}}>Professionnel</a>
        <br/>
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp("Residentiel", "https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x01001C68FDA180D7364A944E05E15788C835", "l_dexa");}}>Residentiel</a>
        <br/>
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp('Terrain agricole', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x0100E8D55D7DA0E6634E877CB3A3C81CA377', "l_dexa");}}>Terrain agricole</a>
        <br/>
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp('Terrain construit', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x01000687B8E348855544B65E6E27FDE2F56C', "l_dexa");}}>Terrain construit</a>
        <br/>
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp('Terrain urbain', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x010066EFF831942ECD478E945D46754C5E05', "l_dexa");}}>Terrain urbain</a>
        <br/>
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp('Terrain villa', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x0100780A656B39ABB54A94CB6E983FA484F6', "l_dexa");}}>Terrain villa</a>
        <br/>
        <a href="#" onClick={(event)=> {event.preventDefault(); WindowPopUp('Villa', 'https://agroupma.sharepoint.com/sites/DEXA2022/_layouts/15/listform.aspx?PageType=8&ListId=%7B43EDC256-1A8E-4918-9B24-DD869312E310%7D&RootFolder=%2Fsites%2FDEXA2022%2FLists%2Fl_dexa&Source=https%3A%2F%2Fagroupma.sharepoint.com%2Fsites%2FDEXA2022%2FLists%2Fl_dexa%2FAllItems.aspx&ContentTypeId=0x0100B2E1F97D34FA5244B36032F5F725C4B4',"l_dexa");}}>Villa</a>
        <br/>
      </Dialog>
      </>
  );
};
