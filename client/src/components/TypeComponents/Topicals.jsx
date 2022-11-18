/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useGetSingleProduct, useGetWeedEndData, useFieldStore } from '../../store';
import { Input, SelectInput } from '../InputComponent';

import Loader from '../Loader';

const Topicals = () => {
  const fields = useFieldStore((state) => state.fields);
  const loading = useFieldStore((state) => state.loading);
  const product = useGetSingleProduct((state) => state.product);

  const defaultValue = [
    {
      id: -1,
      label: 'undefined',
      value: 'undefined',
    },
  ];

  let topicalFormats = [
    ...defaultValue,
  ];

  let phenotypes = [
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
    if (field.name === 'topicalFormats') {
      topicalFormats = [...topicalFormats, ...field.tables];
    }

    if (field.name === 'phenotypes') {
      phenotypes = [...phenotypes, ...field.tables];
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

  const tropicalsCategories = categories.filter((category) => (category.label === 'undefined' || category.label === 'Topicals'));
  const formatValue = topicalFormats.find((format) => format.value);
  const phenoTypesValue = phenotypes.find((phenotype) => phenotype.value);
  const yesNoFormateValue = yesNo.find((yesNoFormate) => yesNoFormate.value);
  const categoryValue = tropicalsCategories.find((category) => category.value);
  const qualityValue = qualities.find((quality) => quality.value);
  const effectValue = effects.find((effect) => effect.value);
  const provinceValue = provinces.find((province) => province.value);

  const addData = useGetWeedEndData((state) => state.addData);

  const [currentFormat, setCurrentFormat] = useState(formatValue);
  const [currentOrganic, setCurrentOrganic] = useState(yesNoFormateValue);
  const [currentCategory, setCurrentCategory] = useState(categoryValue);
  const [currentPhenoTypes, setCurrentPhenoTypes] = useState(phenoTypesValue);
  const [currentQuality, setCurrentQuality] = useState(qualityValue);
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
      <Input label="CBD Mg" defaultValue={product.weedEndData.cbdMg ? product.weedEndData.cbdMg : 'none'} handleChange={(event) => addData('cbdMg', event)} />
      <Input label="THC Mg" defaultValue={product.weedEndData.thcMg ? product.weedEndData.thcMg : 'none'} handleChange={(event) => addData('thcMg', event)} />
      <Input label="Size" defaultValue={product.weedEndData.size ? product.weedEndData.size : 'none'} handleChange={(event) => addData('size', event)} />

      <SelectInput
        label="Format"
        value={product.weedEndData.format ? product.weedEndData.format : 'none'}
        options={topicalFormats}
        selectedOption={currentFormat}
        handleChange={(event) => {
          addData('format', event.value);
          setCurrentFormat(event);
        }}
      />
      <SelectInput
        label="Category"
        value={product.weedEndData.category ? product.weedEndData.category : 'none'}
        options={tropicalsCategories}
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
        label="Organic"
        value={product.weedEndData.organic ? product.weedEndData.organic : 'none'}
        options={yesNo}
        selectedOption={currentOrganic}
        handleChange={(event) => {
          addData('organic', event.value);
          setCurrentOrganic(event);
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

export default Topicals;
