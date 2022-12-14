/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useGetSingleProduct, useGetWeedEndData, useFieldStore, useProducerByTypeStore } from '../../store';
import { Input, SelectInput } from '../InputComponent';

import Loader from '../Loader';

const Vapables = () => {
  const fields = useFieldStore((state) => state.fields);
  const loading = useFieldStore((state) => state.loading);
  const product = useGetSingleProduct((state) => state.product);
  const fetchProducerByType = useProducerByTypeStore((state) => state.fetchProducersByType);

  useEffect(() => {
    const fetch = async () => {
      await fetchProducerByType('vapables');
    };
    fetch();
  }, []);

  const defaultValue = [
    {
      id: -1,
      label: 'undefined',
      value: 'undefined',
    },
  ];

  let vapableConcentratesFormats = [
    ...defaultValue,
  ];

  let vapableConcentratesTypes = [
    ...defaultValue,
  ];

  let phenotypes = [
    ...defaultValue,
  ];

  let terpenes = [
    ...defaultValue,
  ];

  let categories = [
    ...defaultValue,
  ];

  let yesNo = [
    ...defaultValue,
  ];

  let qualities = [
    ...defaultValue,
  ];

  let provinces = [
    ...defaultValue,
  ];

  let effects = [
    ...defaultValue,
  ];

  fields.map((field) => {
    if (field.name === 'vapableConcentratesFormats') {
      vapableConcentratesFormats = [...vapableConcentratesFormats, ...field.tables];
    }

    if (field.name === 'vapableConcentratesTypes') {
      vapableConcentratesTypes = [...vapableConcentratesTypes, ...field.tables];
    }

    if (field.name === 'phenotypes') {
      phenotypes = [...phenotypes, ...field.tables];
    }
    if (field.name === 'terpenes') {
      terpenes = [...terpenes, ...field.tables];
    }

    if (field.name === 'categories') {
      categories = [...categories, ...field.tables];
    }

    if (field.name === 'yesNo') {
      yesNo = [...yesNo, ...field.tables];
    }

    if (field.name === 'qualities') {
      qualities = [...qualities, ...field.tables];
    }

    if (field.name === 'provinces') {
      provinces = [...provinces, ...field.tables];
    }

    if (field.name === 'effects') {
      effects = [...effects, ...field.tables];
    }
  });

  const vapableCategories = categories.filter((category) => (category.label === 'undefined' || category.label === 'Vapable Concentrates'));
  const typeValue = vapableConcentratesTypes.find((type) => type.value);
  const formatValue = vapableConcentratesFormats.find((format) => format.value);
  const phenoTypesValue = phenotypes.find((phenotype) => phenotype.value);
  const tarpeneValue = terpenes.find((tarpene) => tarpene.value);
  const yesNoFormateValue = yesNo.find((yesNoFormate) => yesNoFormate.value);
  const categoryValue = vapableCategories.find((category) => category.value);
  const qualityValue = qualities.find((quality) => quality.value);
  const effectValue = effects.find((effect) => effect.value);
  const provinceValue = provinces.find((province) => province.value);

  const addData = useGetWeedEndData((state) => state.addData);

  const [currentFormat, setCurrentFormat] = useState(formatValue);
  const [currentType, setCurrentType] = useState(typeValue);
  const [currentKit, setCurrentKit] = useState(yesNoFormateValue);
  const [currentCategory, setCurrentCategory] = useState(categoryValue);
  const [currentPhenoTypes, setCurrentPhenoTypes] = useState(phenoTypesValue);
  const [currentQuality, setCurrentQuality] = useState(qualityValue);
  const [currentTarpenes1, setCurrentTarpenes1] = useState(tarpeneValue);
  const [currentTarpenes2, setCurrentTarpenes2] = useState(tarpeneValue);
  const [currentTarpenes3, setCurrentTarpenes3] = useState(tarpeneValue);
  const [currentEffect, setCurrentEffect] = useState(effectValue);
  const [currentProvince, setCurrentProvince] = useState(provinceValue);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="flex flex-wrap items-center">
      <Input label="SKU" defaultValue={product.weedEndData.sku ? product.weedEndData.sku : 'none'} handleChange={(event) => addData('sku', event)} />
      <Input label="Parent SKU" defaultValue={product.weedEndData.parentSku ? product.weedEndData.parentSku : 'none'} handleChange={(event) => addData('parentSku', event)} />
      <Input label="Brand" defaultValue={product.weedEndData.brand ? product.weedEndData.brand : 'none'} handleChange={(event) => addData('brand', event)} />
      <Input label="Product Name" defaultValue={product.weedEndData.productName ? product.weedEndData.productName : 'none'} handleChange={(event) => addData('productName', event)} />
      <Input label="THC %" defaultValue={product.weedEndData.thc ? product.weedEndData.thc : 'none'} handleChange={(event) => addData('thc', event)} />
      <Input label="CBD %" defaultValue={product.weedEndData.cbd ? product.weedEndData.cbd : 'none'} handleChange={(event) => addData('cbd', event)} />
      <Input label="Genetics" defaultValue={product.weedEndData.genetics ? product.weedEndData.genetics : 'none'} handleChange={(event) => addData('genetics', event)} />

      <SelectInput
        label="Format"
        value={product.weedEndData.format ? product.weedEndData.format : 'none'}
        options={vapableConcentratesFormats}
        selectedOption={currentFormat}
        handleChange={(event) => {
          addData('format', event.value);
          setCurrentFormat(event);
        }}
      />
      <SelectInput
        label="Type"
        value={product.weedEndData.type ? product.weedEndData.type : 'none'}
        options={vapableConcentratesTypes}
        selectedOption={currentType}
        handleChange={(event) => {
          addData('type', event.value);
          setCurrentType(event);
        }}
      />
      <SelectInput
        label="Kit"
        value={product.weedEndData.kit ? product.weedEndData.kit : 'none'}
        options={yesNo}
        selectedOption={currentKit}
        handleChange={(event) => {
          addData('kit', event.value);
          setCurrentKit(event);
        }}
      />
      <SelectInput
        label="Category"
        value={product.weedEndData.category ? product.weedEndData.category : 'none'}
        options={vapableCategories}
        selectedOption={currentCategory}
        handleChange={(event) => {
          addData('category', event.value);
          setCurrentCategory(event);
        }}
      />
      <SelectInput
        label="Phenotype"
        value={product.weedEndData.phenotype ? product.weedEndData.phenotype : 'none'}
        options={phenotypes}
        selectedOption={currentPhenoTypes}
        handleChange={(event) => {
          addData('phenotype', event.value);
          setCurrentPhenoTypes(event);
        }}
      />
      <SelectInput
        label="Quality"
        value={product.weedEndData.quality ? product.weedEndData.quality : 'none'}
        options={qualities}
        selectedOption={currentQuality}
        handleChange={(event) => {
          addData('quality', event.value);
          setCurrentQuality(event);
        }}
      />
      <SelectInput
        label="Terpene 1"
        value={product.weedEndData.terpene1 ? product.weedEndData.terpene1 : 'none'}
        options={terpenes}
        selectedOption={currentTarpenes1}
        handleChange={(event) => {
          addData('terpene1', event.value);
          setCurrentTarpenes1(event);
        }}
      />
      <SelectInput
        label="Terpene 2"
        value={product.weedEndData.terpene2 ? product.weedEndData.terpene2 : 'none'}
        options={terpenes}
        selectedOption={currentTarpenes2}
        handleChange={(event) => {
          addData('terpene2', event.value);
          setCurrentTarpenes2(event);
        }}
      />
      <SelectInput
        label="Terpene 3"
        value={product.weedEndData.terpene3 ? product.weedEndData.terpene3 : 'none'}
        options={terpenes}
        selectedOption={currentTarpenes3}
        handleChange={(event) => {
          addData('terpene3', event.value);
          setCurrentTarpenes3(event);
        }}
      />

      <SelectInput
        label="Effect"
        value={product.weedEndData.effect ? product.weedEndData.effect : 'none'}
        options={effects}
        selectedOption={currentEffect}
        handleChange={(event) => {
          addData('effect', event.value);
          setCurrentEffect(event);
        }}
      />
      <SelectInput
        label="Province"
        value={product.weedEndData.province ? product.weedEndData.province : 'none'}
        options={provinces}
        selectedOption={currentProvince}
        handleChange={(event) => {
          addData('province', event.value);
          setCurrentProvince(event);
        }}
      />
      <Input label="Additional Info" defaultValue={product.weedEndData.additionalInfo ? product.weedEndData.additionalInfo : 'none'} handleChange={(event) => addData('additionalInfo', event)} />
      <Input label="Sale Price" defaultValue={product.weedEndData.salePrice ? product.weedEndData.salePrice : 'none'} handleChange={(event) => addData('salePrice', event)} />
    </div>
  );
};

export default Vapables;
