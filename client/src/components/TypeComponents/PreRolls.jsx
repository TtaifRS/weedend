import React, { useState } from 'react';
import { useGetSingleProduct, useGetWeedEndData } from '../../store';
import { Input, SelectInput } from './InputComponent';
import { formataPreroll, categories, phenoTypes, qualities, tarpenes, effects, provinces } from '../../data/datatable';

const PreRolls = () => {
  const preRollCategories = categories.filter((category) => (category.label === 'THC Pre-Rolls' || category.label === 'CBD Pre-Rolls'));

  const product = useGetSingleProduct((state) => state.product);
  const formatValue = formataPreroll.find((format) => format.value);
  const categoryValue = preRollCategories.find((category) => category.value);
  const phenoTypesValue = phenoTypes.find((phenoType) => phenoType.value);
  const qualityValue = qualities.find((quality) => quality.value);
  const tarpeneValue = tarpenes.find((tarpene) => tarpene.value);
  const effectValue = effects.find((effect) => effect.value);
  const provinceValue = provinces.find((province) => province.value);

  const addData = useGetWeedEndData((state) => state.addData);

  const [currentFormat, setCurrentFormat] = useState(formatValue);
  const [currentCategory, setCurrentCategory] = useState(categoryValue);
  const [currentPhenoTypes, setCurrentPhenoTypes] = useState(phenoTypesValue);
  const [currentQuality, setCurrentQuality] = useState(qualityValue);
  const [currentTarpenes1, setCurrentTarpenes1] = useState(tarpeneValue);
  const [currentTarpenes2, setCurrentTarpenes2] = useState(tarpeneValue);
  const [currentTarpenes3, setCurrentTarpenes3] = useState(tarpeneValue);
  const [currentEffect, setCurrentEffect] = useState(effectValue);
  const [currentProvince, setCurrentProvince] = useState(provinceValue);

  return (
    <div className="flex flex-wrap items-center">
      <Input label="SKU" defaultValue={product.weedEndData.sku ? product.weedEndData.sku : 'undefined'} handleChange={(event) => addData('sku', event)} />
      <Input label="Parent SKU" defaultValue={product.weedEndData.parentSku ? product.weedEndData.parentSku : 'undefined'} handleChange={(event) => addData('parentSku', event)} />
      <Input label="Brand" defaultValue={product.weedEndData.brand ? product.weedEndData.brand : 'undefined'} handleChange={(event) => addData('brand', event)} />
      <Input label="Product Name" defaultValue={product.weedEndData.productName ? product.weedEndData.productName : 'undefined'} handleChange={(event) => addData('productName', event)} />
      <Input label="THC %" defaultValue={product.weedEndData.thc ? product.weedEndData.thc : 'undefined'} handleChange={(event) => addData('thc', event)} />
      <Input label="CBD %" defaultValue={product.weedEndData.cbd ? product.weedEndData.cbd : 'undefined'} handleChange={(event) => addData('cbd', event)} />
      <Input label="Genetics" defaultValue={product.weedEndData.genetics ? product.weedEndData.genetics : 'undefined'} handleChange={(event) => addData('genetics', event)} />

      <SelectInput
        label="Format"
        value={product.weedEndData.format ? product.weedEndData.format : 'undefined'}
        options={formataPreroll}
        selectedOption={currentFormat}
        handleChange={(event) => {
          addData('format', event.value);
          setCurrentFormat(event);
        }}
      />
      <SelectInput
        label="Category"
        value={product.weedEndData.category ? product.weedEndData.category : 'undefined'}
        options={preRollCategories}
        selectedOption={currentCategory}
        handleChange={(event) => {
          addData('category', event.value);
          setCurrentCategory(event);
        }}
      />
      <SelectInput
        label="Phenotype"
        value={product.weedEndData.phenotype ? product.weedEndData.phenotype : 'undefined'}
        options={phenoTypes}
        selectedOption={currentPhenoTypes}
        handleChange={(event) => {
          addData('phenotype', event.value);
          setCurrentPhenoTypes(event);
        }}
      />
      <SelectInput
        label="Quality"
        value={product.weedEndData.quality ? product.weedEndData.quality : 'undefined'}
        options={qualities}
        selectedOption={currentQuality}
        handleChange={(event) => {
          addData('quality', event.value);
          setCurrentQuality(event);
        }}
      />
      <SelectInput
        label="Terpene 1"
        value={product.weedEndData.terpene1 ? product.weedEndData.terpene1 : 'undefined'}
        options={tarpenes}
        selectedOption={currentTarpenes1}
        handleChange={(event) => {
          addData('terpene1', event.value);
          setCurrentTarpenes1(event);
        }}
      />
      <SelectInput
        label="Terpene 2"
        value={product.weedEndData.terpene2 ? product.weedEndData.terpene2 : 'undefined'}
        options={tarpenes}
        selectedOption={currentTarpenes2}
        handleChange={(event) => {
          addData('terpene2', event.value);
          setCurrentTarpenes2(event);
        }}
      />
      <SelectInput
        label="Terpene 3"
        value={product.weedEndData.terpene3 ? product.weedEndData.terpene3 : 'undefined'}
        options={tarpenes}
        selectedOption={currentTarpenes3}
        handleChange={(event) => {
          addData('terpene3', event.value);
          setCurrentTarpenes3(event);
        }}
      />
      <Input label="Organic" defaultValue={product.weedEndData.organic ? product.weedEndData.organic : 'undefined'} handleChange={(event) => addData('organic', event)} />
      <Input label="Micro" defaultValue={product.weedEndData.micro ? product.weedEndData.micro : 'undefined'} handleChange={(event) => addData('micro', event)} />
      <Input label="Hand-Trimmed" defaultValue={product.weedEndData.handTrimmed ? product.weedEndData.handTrimmed : 'undefined'} handleChange={(event) => addData('shandTrimmedku', event)} />
      <Input label="Hang-Dried" defaultValue={product.weedEndData.hangDried ? product.weedEndData.hangDried : 'undefined'} handleChange={(event) => addData('hangDried', event)} />
      <SelectInput
        label="Effect"
        value={product.weedEndData.effect ? product.weedEndData.effect : 'undefined'}
        options={effects}
        selectedOption={currentEffect}
        handleChange={(event) => {
          addData('effect', event.value);
          setCurrentEffect(event);
        }}
      />
      <SelectInput
        label="Province"
        value={product.weedEndData.province ? product.weedEndData.province : 'undefined'}
        options={provinces}
        selectedOption={currentProvince}
        handleChange={(event) => {
          setCurrentProvince(event);

          if (event.value === 'undefined') {
            addData('province', '');
          }
          if (event.value !== 'undefined') {
            addData('province', event.value);
          }
        }}
      />
      <Input label="Additional Info" defaultValue={product.weedEndData.additionalInfo ? product.weedEndData.additionalInfo : 'undefined'} handleChange={(event) => addData('additionalInfo', event)} />
      <Input label="Sale Price" defaultValue={product.weedEndData.salePrice ? product.weedEndData.salePrice : 'undefined'} handleChange={(event) => addData('salePrice', event)} />
    </div>
  );
};

export default PreRolls;
