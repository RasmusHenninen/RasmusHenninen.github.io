import { useState } from "react";

const Row = ({ row }) => {
  const specName = row.specifications.reduce((result, spec) => {
    if (spec.name === "Category" && spec.value) {
      result = spec.value;
    }

    return result;
  }, null);

  let description = "MISSING DESCRIPTION";
  if (row.descriptions && row.descriptions[0]) {
    if (!row.descriptions[0].value) {
      description = "EMPTY DESCRIPTION";
    } else {
      description = row.descriptions[0].value;
    }
  }

  return (
    <tr>
      <td>{row.name}</td>
      <td>{description}</td>
      <td>{specName}</td>
    </tr>
  );
};

const Productable = ({ data }) => {
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    specification: "",
  });

  const filterDesc = (product) => {
    return product === undefined;
  };

  const filterSpecifications = ({ name, value }) =>
    name === "Category" &&
    value.toLowerCase().includes(filters.specification.toLowerCase());

  const products = data.data.brand.master_products
    .flatMap(({ products }) => products)
    .filter(({ products, name, descriptions, specifications }) => {
      if (!filterDesc(products)) return false;

      return (
        name.toLowerCase().includes(filters.name.toLowerCase()) &&
        descriptions?.[0]?.value
          .toLowerCase()
          .includes(filters.description.toLowerCase()) &&
        specifications.some(filterSpecifications)
      );
    });

  const handleInputChange = (event, name) => {
    setFilters({
      ...filters,
      [name]: event.target.value,
    });
  };

  return (
    <>
      <input
        type="text"
        onChange={(event) => handleInputChange(event, "name")}
      />
      <input
        type="text"
        onChange={(event) => handleInputChange(event, "description")}
      />
      <input
        type="text"
        onChange={(event) => handleInputChange(event, "specification")}
      />
      <table class="searchable sortable">
        <thead>
          <tr>
            <td> Names </td>
            <td> Descriptions </td>
            <td> Specifications </td>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <Row key={index} row={p} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Productable;
