import {Dropdown} from "primereact/dropdown";
import {GENERATIONS, Language, LANGUAGES, Version} from "../firebase/types";
import React from "react";
import {SaveImg} from "./SaveImg";

export const VersionLanguagePicker = (props: {value: {version: Version, language: Language}, onChange: (v: Version, l: Language) => void}) => {

    const versionTemplate = (option: any, size = '4em') => {
        return <div className="flex align-items-end">
            <SaveImg version={option.value} width={size}/>
            <div className="text-lg">{option.label}</div>
        </div>;
    };

    console.log(props.value)

    return <>
        <div className="col-6">
            Game version
        </div>
        <div className="col-6">
            <Dropdown value={props.value.version}
                      onChange={e => props.onChange(e.value, props.value.language)}
                      options={GENERATIONS}
                      optionLabel={'label'}
                      optionValue={'value'}
                      optionGroupLabel={'label'}
                      optionGroupChildren={'versions'}
                      optionGroupTemplate={o => o.label}
                      itemTemplate={versionTemplate}
                      valueTemplate={o => versionTemplate(o, '2em')}
                      style={{width: '100%', color: 'black'}}
            />
        </div>
        <div className="col-6">
            Game language
        </div>
        <div className="col-6">
            <Dropdown value={props.value.language}
                      onChange={e => props.onChange(props.value.version, e.value)}
                      options={LANGUAGES}
                      optionValue="value"
                      optionLabel="label"
                      style={{width: '100%'}}
            />
        </div>
    </>
}
