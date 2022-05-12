import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/items/get-all";
import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, IDropdownOption, IDropdownStyles, Panel, PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { DISTANCE_END_EVALUATION, DISTANCE_START_EVALUATION, sp } from '../../Constants';
import { calculated_score, estimated_price, extendDistanceEvaluer, getLat, getLng } from './utils';
import PopOut from '../fabric-ui/PopOut';
import "@pnp/sp/webs";
import styles from '../MapsDexa2022.module.scss';

interface IEvaluerProps {
  buttonTitle: string;
  latlng:string;
  dgi:any;
  handleEvaluer({}):any;
}

export default function Evaluer (props:IEvaluerProps){
  let [isOpen, setIsOpen] = React.useState(false);
  let [form, setForm] = React.useState({type_de_bien:"Résidentiel", surface:0,surface_score:3, situation_general_score:3, standing_appartement_score:3, standing_immeuble_score:3});
  let [typeDeBien, setTypeDeBien] = React.useState("Résidentiel");
  let [alert, setAlert] = React.useState(false);
  let [alertDgi, setAlertDGi] = React.useState(false);
  let [popOut, setPopOut] = React.useState(false);
  let [evaluation, setEvaluation] = React.useState(null);
  let lat = getLat(props.latlng);
  let lng = getLng(props.latlng);
  
  const start = {
    latitude: lat,
    longitude: lng
  };
  const evaluationDialogContentProps = {
      type: DialogType.largeHeader,
      title: "Avis de valeur sur le bien.",
      subText: '',
  };
  var dialogContentProps = {
    type: DialogType.normal,
    title: 'Alert',
    subText: "Cette fonctionalite en cours de developpement."
  };
  const dialogContentDGIProps = {
    type: DialogType.normal,
    title: 'Oups',
    subText: "Désolé la zone choisie n'est pas prise en charge par le système."
  };
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };
  const options_type_de_bien: IDropdownOption[] = [
    { key: 'Résidentiel', text: 'Résidentiel'},
    { key: 'Professionnel', text: 'Professionnel'},
    { key: 'Commercial', text: 'Commercial'},
    { key: 'Terrain Villa', text: 'Terrain Villa' },
    { key: 'Terrain Urbain', text: 'Terrain Urbain' },
    { key: 'Terrain Construit', text: 'Terrain Construit' },
    { key: 'Terrain Agricole', text: 'Terrain Agricole' },
    { key: 'Villa', text: 'Villa' },
  ];
  const options: IDropdownOption[] = [
    { key: 1, text: 'Très faible' },
    { key: 2, text: 'Faible' },
    { key: 3, text: 'Moyen' },
    { key: 4, text: 'Bon' },
    { key: 5, text: 'Très bon' },
  ];
  const onChange_type_de_bien = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setForm({...form, type_de_bien: item.key.toString()});
    setTypeDeBien(item.text);
  };
  const onChange_surface_score = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setForm({...form, surface_score: Number(item.key)});
  };
  const onChange_situation_general_score = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setForm({...form, situation_general_score: Number(item.key)});
  };
  const onChange_standing_appartement_score = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setForm({...form, standing_appartement_score: Number(item.key)});
  };
  const onChange_standing_immeuble_score = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setForm({...form, standing_immeuble_score: Number(item.key)});
    
  };
  async function _onSubmit(){
    if(props.dgi[0]!=null){
      if(form.surface!=0){
        setIsOpen(false);
        var array_prix_dexa:any = [];
        var time_start = new Date(Date.now());
        var s_start = time_start.getSeconds();

        const items: any[] = await sp.web.lists.getByTitle("Pins").items.select("Id", 
        "regionsId",
        "Latitude_Longitude",
        "Surface_x0020_pond_x00e9_r_x00e9",
        "Surface_x0020_construite",
        "Surface_x0020_terrain",
        "Type_x0020_de_x0020_bien",
        "Type_x0020_de_x0020_R_x00e9_f_x0", 
        "Title", 
        "Prix_x0020_unitaire_x0020__x002F",
        "Prix_x0020_unitaire_x0020_pond_x",
        "Prix_x0020_unitaire_x0020_terrai").getAll();

        var filterd_list:any = [];
        var rest_filterd_list = extendDistanceEvaluer(items, start, DISTANCE_START_EVALUATION, DISTANCE_END_EVALUATION, props.dgi[0], form.type_de_bien);
        filterd_list = rest_filterd_list.filterd_list;
        array_prix_dexa = rest_filterd_list.array_prix_dexa;
        
        var time_end = new Date(Date.now());
        var s_end =time_end.getSeconds();
        //console.log("time: ", s_end-s_start);

        var Min_price = Math.min.apply(null, array_prix_dexa);
        var Max_price = Math.max.apply(null, array_prix_dexa);
        var _calculated_score = calculated_score(form.surface_score, form.situation_general_score, form.standing_appartement_score, form.standing_immeuble_score );

        var _estimated_price  = estimated_price(Max_price, Min_price, _calculated_score);

        var result = {
          perimetre:rest_filterd_list.dis,
          prix_estimer: _estimated_price,
          dgi_zone:props.dgi[0],
          nbr_ref_dexa:rest_filterd_list.nbr_dexa,
          all_ref:filterd_list,
          type_de_bien:typeDeBien,
          prix_total: _estimated_price * form.surface,
          array_prix_dexa: array_prix_dexa
        };
        setEvaluation(result);
        
        setPopOut(true);
        //type_de_bien:"", surface_score:3, situation_general_score:3, standing_appartement_score:3, standing_immeuble_score:3
        setForm({...form, type_de_bien:"Résidentiel", surface:0 ,surface_score:3, situation_general_score:3, standing_appartement_score:3, standing_immeuble_score:3});
        //props.handleEvaluer(result);
          
      }else{
        setAlert(true);
        return null;
      }
    }else{
      dialogContentProps = {
        type: DialogType.normal,
        title: 'Oups',
        subText: 'Désolé la zone choisie n\'est pas prise en charge par le système.',
      };
      setAlertDGi(true);
    }

  }
  return (
    <div>
    <Stack horizontal horizontalAlign="start"> 
      <ActionButton iconProps={{iconName: 'NewsSearch'}} text={props.buttonTitle} onClick={() => setIsOpen(true)}/>
    </Stack>
    {isOpen?
      <Dialog hidden={!alert} onDismiss={()=>setIsOpen(false)} dialogContentProps={dialogContentProps} modalProps={modelProps}>
          <DialogFooter>
            <DefaultButton onClick={()=>setIsOpen(false)} text="Cancel" />
          </DialogFooter>
        </Dialog>:<></>}
      
      {/* {alert ? <Dialog hidden={!alert} onDismiss={()=>setAlert(false)} dialogContentProps={dialogContentProps} modalProps={modelProps}>
          <DialogFooter>
            <DefaultButton onClick={()=>setAlert(false)} text="Cancel" />
          </DialogFooter>
        </Dialog>
      :<></>}
      {alertDgi?       
        <Dialog hidden={!alertDgi} onDismiss={()=>setAlertDGi(false)} dialogContentProps={dialogContentDGIProps} modalProps={modelProps}>
          <DialogFooter>
            <DefaultButton onClick={()=>setAlertDGi(false)} text="Cancel" />
          </DialogFooter>
        </Dialog>
      :<></>}
      {popOut?
        <Dialog hidden={!popOut} onDismiss={()=> setPopOut(false)} dialogContentProps={evaluationDialogContentProps} modalProps={modelProps} styles={{main: {selectors: {['@media (min-width: 480px)']: {width: 550,height: 555,minWidth: 450,maxWidth: '1000px'}}}}}>
          <PopOut evaluation={evaluation}/>
        </Dialog>
        :<></>
      }  
      <Stack horizontal horizontalAlign="start"> 
        <ActionButton iconProps={{iconName: 'NewsSearch'}} text={props.buttonTitle} onClick={() => setIsOpen(true)}/>
      </Stack>
      <Panel isOpen={isOpen} onDismiss={()=> setIsOpen(false)} headerText="Evaluation" closeButtonAriaLabel="Close">
        <Stack tokens={{childrenGap:10}}>{/* stack organise les flex *
          <Dropdown onChange={onChange_type_de_bien} placeholder="Selectionner le type de bien" label="TYPE DE BIEN (n'est disponible que pour les résidentiels)" options={options_type_de_bien} styles={dropdownStyles} defaultSelectedKey={form.type_de_bien}/>
          <Stack tokens={{childrenGap:10}}>
             <TextField label="Surface du bien" placeholder="Entrez la surface du bien" onChange={(e) => setForm({...form, surface:parseInt((e.target as HTMLInputElement).value)}) }/>
          </Stack>
          <Stack tokens={{childrenGap:10}}>
            <Dropdown onChange={onChange_surface_score} placeholder="Surface Description" label="Surface Description" options={options} styles={dropdownStyles} defaultSelectedKey={form.surface_score}/>
          </Stack>
          <Stack tokens={{ childrenGap: 10}}>
            <Dropdown onChange={onChange_situation_general_score} placeholder="Situation Général" label="Situation Général" options={options} styles={dropdownStyles} defaultSelectedKey={form.situation_general_score}/>
          </Stack>
          <Stack tokens={{ childrenGap: 10}}>
            <Dropdown onChange={onChange_standing_appartement_score} placeholder="Standing de l'appartement" label="Standing de l'appartement" options={options} styles={dropdownStyles} defaultSelectedKey={form.standing_appartement_score}/>
          </Stack>
          <Stack tokens={{ childrenGap: 10}}>
            <Dropdown onChange={onChange_standing_immeuble_score} placeholder="Standing de l'immeuble" label="Standing de l'immeuble" options={options} styles={dropdownStyles} defaultSelectedKey={form.standing_immeuble_score}/>
          </Stack>
          <Stack horizontal horizontalAlign="end" tokens={{childrenGap:30}}>
            <PrimaryButton text="Evaluer" onClick={() => _onSubmit()}></PrimaryButton>
            <DefaultButton text="Cancel" onClick={() => setIsOpen(false)}></DefaultButton>
          </Stack>
        </Stack>
      </Panel> */}
    </div>
  );
}

