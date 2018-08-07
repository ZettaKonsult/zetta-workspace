const normalizeResponse = response =>
  response.reduce(
    ({ entities, result }, entity) => {
      return {
        entities: { ...entities, [entity.id]: entity },
        result: [...result, entity.id],
      };
    },
    { entities: {}, result: [] }
  );

export default normalizeResponse;
