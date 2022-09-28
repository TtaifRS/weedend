import React, { useState } from 'react';
import { useGetSingleProduct } from '../../store';
import { Input, SelectInput } from './InputComponent';
import { formatFlower, categories, phenoTypes, qualities, tarpenes, effects, provinces } from '../../data/datatable';

const Flowers = () => {
  const product = useGetSingleProduct((state) => state.product);
  const formatValue = formatFlower.find((format) => format.value);
  const categoryValue = categories.find((category) => category.value);
  const phenoTypesValue = phenoTypes.find((phenoType) => phenoType.value);
  const qualityValue = qualities.find((quality) => quality.value);
  const tarpeneValue = tarpenes.find((tarpene) => tarpene.value);
  const effectValue = effects.find((effect) => effect.value);
  const provinceValue = provinces.find((province) => province.value);

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
      <Input label="SKU" defaultValue={product.weedEndData.sku ? product.weedEndData.sku : 'undefined'} handleChange={console.log('change')} />
      <Input label="Parent SKU" defaultValue={product.weedEndData.parentSku ? product.weedEndData.parentSku : 'undefined'} handleChange={console.log('change')} />
      <Input label="Brand" defaultValue={product.weedEndData.brand ? product.weedEndData.brand : 'undefined'} handleChange={console.log('change')} />
      <Input label="Product Name" defaultValue={product.weedEndData.productName ? product.weedEndData.productName : 'undefined'} handleChange={console.log('change')} />
      <Input label="THC %" defaultValue={product.weedEndData.thc ? product.weedEndData.thc : 'undefined'} handleChange={console.log('change')} />
      <Input label="CBD %" defaultValue={product.weedEndData.cbd ? product.weedEndData.cbd : 'undefined'} handleChange={console.log('change')} />
      <Input label="Genetics" defaultValue={product.weedEndData.genetics ? product.weedEndData.genetics : 'undefined'} handleChange={console.log('change')} />

      <SelectInput
        label="Format"
        value={product.weedEndData.format ? product.weedEndData.format : 'undefined'}
        options={formatFlower}
        selectedOption={currentFormat}
        handleChange={(event) => setCurrentFormat(event)}
      />
      <SelectInput
        label="Category"
        value={product.weedEndData.category ? product.weedEndData.category : 'undefined'}
        options={categories}
        selectedOption={currentCategory}
        handleChange={(event) => setCurrentCategory(event)}
      />
      <SelectInput
        label="Phenotype"
        value={product.weedEndData.phenotype ? product.weedEndData.phenotype : 'undefined'}
        options={phenoTypes}
        selectedOption={currentPhenoTypes}
        handleChange={(event) => setCurrentPhenoTypes(event)}
      />
      <SelectInput
        label="Quality"
        value={product.weedEndData.quality ? product.weedEndData.quality : 'undefined'}
        options={qualities}
        selectedOption={currentQuality}
        handleChange={(event) => setCurrentQuality(event)}
      />
      <SelectInput
        label="Terpene 1"
        value={product.weedEndData.terpene1 ? product.weedEndData.terpene1 : 'undefined'}
        options={tarpenes}
        selectedOption={currentTarpenes1}
        handleChange={(event) => setCurrentTarpenes1(event)}
      />
      <SelectInput
        label="Terpene 2"
        value={product.weedEndData.terpene2 ? product.weedEndData.terpene2 : 'undefined'}
        options={tarpenes}
        selectedOption={currentTarpenes2}
        handleChange={(event) => setCurrentTarpenes2(event)}
      />
      <SelectInput
        label="Terpene 3"
        value={product.weedEndData.terpene3 ? product.weedEndData.terpene3 : 'undefined'}
        options={tarpenes}
        selectedOption={currentTarpenes3}
        handleChange={(event) => setCurrentTarpenes3(event)}
      />
      <Input label="Organic" defaultValue={product.weedEndData.organic ? product.weedEndData.organic : 'undefined'} handleChange={console.log('change')} />
      <Input label="Micro" defaultValue={product.weedEndData.micro ? product.weedEndData.micro : 'undefined'} handleChange={console.log('change')} />
      <Input label="Hand-Trimmed" defaultValue={product.weedEndData.handTrimmed ? product.weedEndData.handTrimmed : 'undefined'} handleChange={console.log('change')} />
      <Input label="Hang-Dried" defaultValue={product.weedEndData.hangDried ? product.weedEndData.hangDried : 'undefined'} handleChange={console.log('change')} />
      <SelectInput
        label="Effect"
        value={product.weedEndData.effect ? product.weedEndData.effect : 'undefined'}
        options={effects}
        selectedOption={currentEffect}
        handleChange={(event) => setCurrentEffect(event)}
      />
      <SelectInput
        label="Province"
        value={product.weedEndData.province ? product.weedEndData.province : 'undefined'}
        options={provinces}
        selectedOption={currentProvince}
        handleChange={(event) => setCurrentProvince(event)}
      />
      <Input label="Additional Info" defaultValue={product.weedEndData.additionalInfo ? product.weedEndData.additionalInfo : 'undefined'} handleChange={console.log('change')} />
      <Input label="Sale Price" defaultValue={product.weedEndData.salePrice ? product.weedEndData.salePrice : 'undefined'} handleChange={console.log('change')} />
    </div>
  );
};

export default Flowers;
