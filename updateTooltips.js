
const BASE_URL = 'http://localhost:1337/api/';
const USERNAME = 'SETME';
const PASSWORD = 'SETME';
const locale = 'en';
let token = '';

const updateList = [
  {
    dataInfoSlug: 'coverage-widget',
    content: 'Percentage of region reported as protected or conserved.'
  },
  {
    dataInfoSlug: '30x30-marine-target',
    content: 'The Global Biodiversity Framework’s 30x30 target aims to protect at least 30% of Earth’s land and water by 2030. For this location, the target is {target}% by {target_year}. Learn more at "https://www.cbd.int/gbf/targets/3/"',
    dataSourceSlug: '30x30-target',
    dataSourceTitle: 'Learn more.',
    dataSourceUrl: 'https://www.cbd.int/gbf/targets/3/'
  },
  {
    dataInfoSlug: '30x30-terrestrial-target',
    content: 'The Global Biodiversity Framework’s 30x30 target aims to protect at least 30% of Earth’s land and water by 2030. Learn more at "https://www.cbd.int/gbf/targets/3/"',
    dataSourceSlug: '30x30-target',
    dataSourceTitle: 'Learn more.',
    dataSourceUrl: 'https://www.cbd.int/gbf/targets/3/'
  },
  {
    dataInfoSlug: 'habitat-widget-terrestrial',
    content: 'Percentage of habitats protected by region, estimated by intersecting IUCN Level 1 terrestrial habitat types with protected area boundaries. For illustrative purposes only; not for official statistics.',
    dataSourceSlug: 'jung-et-al',
  },
  {
    dataInfoSlug: 'fully-highly-protected',
    content: 'Percentage of waters that are Fully or Highly Protected, according to MPAtlas/The MPA Guide.'
  },
  {
    dataInfoSlug: 'fishing-protection-level',
    content: 'Percentage of waters that are highly protected from fishing, according to ProtectedSeas evaluations.'
  },
  {
    dataInfoSlug: 'habitat-widget-marine',
    content: 'Percentage of habitats protected by region, estimated by intersecting marine habitat types with protected area boundaries. For illustrative purposes only; not for official statistics.'
  },
  {
    dataSourceSlug: 'warm-water corals',
    dataSourceTitle: 'UNEP-WCMC, WorldFish Centre, WRI, TNC (2021). Global distribution of coral reefs, compiled from multiple sources including the Millennium Coral Reef Mapping Project. Version 4.1',
    dataSourceUrl: 'https://resources.unep-wcmc.org/products/0613604367334836863f5c0c10e452bf'
  },
  {
    dataSourceSlug: 'cold-water corals',
    dataSourceTitle: 'Global distribution of cold-water corals. Source: Freiwald A, Rogers A, Hall-Spencer J, Guinotte JM, Davies AJ, Yesson C, Martin CS, Weatherdon LV (2021). Global distribution of cold-water corals. Version 5.1',
    dataSourceUrl: null
  },
  {
    dataSourceSlug: 'seagrasses',
    dataSourceTitle: 'UNEP-WCMC, Short FT (2017). Global distribution of seagrasses (version 5.0)',
    dataSourceUrl: 'https://www.unep.org/resources/publication/global-distribution-seagrasses'
  },
  {
    dataSourceSlug: 'saltmarshes',
    dataSourceTitle: 'Mcowen C, Weatherdon LV, Bochove J, Sullivan E, Blyth S, Zockler C, Stanwell-Smith D, Kingston N, Martin CS, Spalding M, Fletcher S (2017). A global map of saltmarshes. Biodiversity Data Journal 5: e11764.',
    dataSourceUrl: null
  },
  {
    dataSourceSlug: 'seamounts',
    dataSourceTitle: 'Yesson C, Clark MR, Taylor M, Rogers AD (2011). The global distribution of seamounts based on 30-second bathymetry data. Deep Sea Research Part I: Oceanographic Research Papers 58: 442-453.',
    dataSourceUrl: null
  },
  {
    dataInfoSlug: 'coverage',
    content: 'Percentage of region reported as protected or conserved.',
    dataSourceSlug: 'protected-planet',
  },
  {
    dataInfoSlug: 'oecms',
    content: 'Percentage of region reported as OECMs.',
    dataSourceSlug: 'protected-planet',
  },
  //~~~~~~~~~~~~~~~~~~~~~~~ LAYERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    layerTitle: 'Countries',
    metadata: {
      description: 'National boundaries from GADM 4.1 (Global Administrative Areas). In GADM, a "country" refers to any entity with an ISO country code, though many of these are not sovereign states. Here, the dataset has been modified to link territories to their corresponding sovereign nations.',
      citation: 'Global Administrative Areas (GADM) Database (2024). Version 4.1.',
      source: "https://gadm.org/data.html"
    }
  },
  {
    layerTitle: 'Terrestrial regions',
    metadata: {
      description: 'Grouping of GADM 4.1 countries into one of seven regions: Africa, Asia & Pacific, Europe, Latin America & Caribbean, North America, Polar, and West Asia.',
      citation: 'Global Administrative Areas (GADM) Database (2024). Version 4.1.',
      source: "https://gadm.org/data.html"
    }
  },
  {
    layerTitle: 'EEZ',
    metadata: {
      description: "An EEZ (Exclusive Economic Zone) is a maritime area that extends up to 200 nautical miles from a coastal state's shoreline. It grants that state special rights and control over the resources in that zone.",
      citation: null,
      source: null
    }
  },
  {
    layerTitle: 'Key habitats',
    updatedLayerTitle: 'Terrestrial habitats',
    metadata: {
      description: 'Global distribution of terrestrial habitat types.',
      citation: 'Jung et al. 2020, Sci. Data 7, 256',
      source: 'https://doi.org/10.1038/s41597-020-00599-8'
    }
  },
  {
    layerTitle: 'Jung et al. (2021)',
    metadata: {
      description: 'Recommended 30% of the terrestrial habitats that should be protected.',
      citation: 'Jung et al. (2021). Areas of global importance for conserving terrestrial biodiversity, carbon, and water. Nature Ecology & Evolution, 5, 1499–1509.',
      source: 'https://doi.org/10.1038/s41559-021-01528-7'
    }
  },
  {
    layerTitle: 'Terrestrial protection type',
    metadata: {
      description: 'A Protected Area (PA) is a designated and managed region for conservation. An Other Effective Area-Based Conservation Measure (OECM) is a governed area outside the PA network that delivers long-term biodiversity conservation alongside ecosystem and cultural benefits. Learn more about PAs, OECMs, and their role in 30x30 at https://www.cbd.int/gbf/targets/3',
      citation: 'UNEP-WCMC (2024). Protected areas map of the world, October 2024.',
      source: 'https://www.protectedplanet.net/'
    }
  },
  {
    layerTitle: 'Terrestrial protection type',
    metadata: {
      description: 'A Protected Area (PA) is a designated and managed region for conservation. An Other Effective Area-Based Conservation Measure (OECM) is a governed area outside the PA network that delivers long-term biodiversity conservation alongside ecosystem and cultural benefits. Learn more about PAs, OECMs, and their role in 30x30 at https://www.cbd.int/gbf/targets/3',
      citation: 'UNEP-WCMC (2024). Protected areas map of the world, October 2024.',
      source: 'https://www.protectedplanet.net/'
    }
  },
  {
    layerTitle: 'Marine regions',
    metadata: {
      description: 'Grouping of territorial and high seas marine areas into one of seven regions: Africa, Asia & Pacific, Europe, Latin America & Caribbean, North America, Polar, and West Asia.'
    }
  },
  {
    layerTitle: 'Fishing effort (past 12 months)',
    metadata: {
      description: 'Apparent fishing effort for the past 12 months represented in hours per unit area.',
      citation: 'Global Fishing Watch',
      source: 'https://globalfishingwatch.org/dataset-and-code-fishing-effort/'
    }
  },
  {
    layerTitle: 'Cold water corals',
    metadata: {
      description: 'Global distribution of cold-water corals.',
      citation: 'Freiwald A, Rogers A, Hall-Spencer J, Guinotte JM, Davies AJ, Yesson C, Martin CS, Weatherdon LV (2021). Global distribution of cold-water corals. Version 5.1.'
    }
  },
  {
    layerTitle: 'Warm water corals',
    metadata: {
      description: 'Global distribution of coral reefs in tropical and subtropical regions. ',
      citation: 'UNEP-WCMC, WorldFish Centre, WRI, TNC (2021). Global distribution of coral reefs, compiled from multiple sources including the Millennium Coral Reef Mapping Project. Version 4.1',
      source: 'https://resources.unep-wcmc.org/products/0613604367334836863f5c0c10e452bf'
    }
  },
  {
    layerTitle: 'Mangroves',
    metadata: {
      description: 'Global distribution of mangroves',
      citation: 'Global Mangrove Watch',
      source: 'https://www.globalmangrovewatch.org/'
    }
  },
  {
    layerTitle: 'Seagrasses',
    metadata: {
      description: 'Global distribution of seagrasses',
      citation: 'UNEP-WCMC, Short FT (2017). Global distribution of seagrasses (version 5.0)',
      source: 'https://www.unep.org/resources/publication/global-distribution-seagrasses'
    }
  },
  {
    layerTitle: 'Saltmarshes',
    metadata: {
      description: 'Global distribution of saltmarshes',
      citation: 'Global distribution of saltmarshes. Source: Mcowen C, Weatherdon LV, Bochove J, Sullivan E, Blyth S, Zockler C, Stanwell-Smith D, Kingston N, Martin CS, Spalding M, Fletcher S (2017). A global map of saltmarshes. Biodiversity Data Journal 5: e11764.',
      source: null
    }
  },
  {
    layerTitle: 'Seamounts',
    metadata: {
      description: 'Global distribution of seamounts',
      citation: 'Yesson C, Clark MR, Taylor M, Rogers AD (2011). The global distribution of seamounts based on 30-second bathymetry data. Deep Sea Research Part I: Oceanographic Research Papers 58: 442-453.',
      source: null
    }
  },
  {
    layerTitle: 'Pew',
    metadata: {
      description: 'Recommended 30% of the high seas that should be protected',
      citation: `Pew's "Protect High Seas".`,
      source: 'https://www.pewtrusts.org/en/research-and-analysis/data-visualizations/2023/protect-high-seas#'
    }
  },
  {
    layerTitle: 'Sala et al. (2021)',
    metadata: {
      description: 'Recommended 30% of the ocean that should be protected. ',
      citation: 'Sala, E., Mayorga, J., Bradley, D. et al. (2021). Protecting the global ocean for biodiversity, food and climate. Nature 592, 397–402. https://doi.org/10.1038/s41586-021-03371-z.',
    }
  },
  {
    layerTitle: 'Zhao et al. (2020)',
    metadata: {
      description: 'Recommended 30% of the ocean that should be protected.',
      citation: 'Zhao, Q., Stephenson, F., Lundquist, C., Kaschner, K., Jayathilake, D., & Costello, M. J. (2020). Where marine protected areas would best represent 30% of ocean biodiversity. Biological Conservation, 244, 108536.',
      source: 'https://doi.org/10.1016/j.biocon.2020.108536'
    }
  },
  {
    layerTitle: 'Protection level',
    metadata: {
      description: 'The degree to which biodiversity and ecosystems within an MPA are protected from extractive or destructive activities.',
      citation: 'Marine Conservation Institute. MPAtlas.',
      source: 'https://marine-conservation.org/mpatlas/'
    }
  },
  {
    layerTitle: 'Establishment stage',
    metadata: {
      description: 'Whether a protected area exists only on paper or is in operation and actively managed.',
      citation: 'Marine Conservation Institute. MPAtlas.',
      source: 'https://marine-conservation.org/mpatlas/'
    }
  },
  {
    layerTitle: 'Fishing protection',
    metadata: {
      description: 'Percentage of waters that are highly protected from fishing, according to ProtectedSeas evaluations.',
      citation: 'ProtectedSeas',
      source: 'https://navigatormap.org/'
    }
  },
  {
    layerTitle: 'Marine protection type',
    metadata: {
      description: 'A Marine Protected Area (MPA) is a designated and managed region for conservation. An Other Effective Area-Based Conservation Measure (OECM) is a governed area outside the PA network that delivers long-term biodiversity conservation alongside ecosystem and cultural benefits. Learn more about PAs, OECMs, and their role in 30x30 at https://www.cbd.int/gbf/targets/3/',
      citation: 'UNEP-WCMC (2024). Protected areas map of the world, October 2024.',
      source: 'https://www.protectedplanet.net/'
    }
  },
  //~~~~~~~~~~~~~~~~~~~~~~~ Datasets ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    datasetSlug: 'priority-areas',
    datasetName: '30% Protection Target Areas'
  }
];

async function login() {
  const res = await fetch(`${BASE_URL}auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: USERNAME,
      password: PASSWORD,
    }),
  })
  const data = await res.json();
  token = data.jwt;
}

//~~~~~~~~~~~~~~~~~~~~~~~ DataInfo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getDataInfo(slug) {
  try {
    const res = await fetch(`${BASE_URL}data-infos?filters[slug][$eq]=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      throw new Error(`Problem getting data info for slug: ${slug}. Returned Status: ${res.status}`);
    }
    const jsonData = await res.json();

    if (!jsonData.data.length || jsonData.data.length > 1) {
      return null;
    }

    return jsonData.data[0].id;
  } catch (error) {
    console.error("Problem getting data info for slug: ", slug, error);
    throw error;

  }
}

async function updateDataInfo(dataInfoId, content, dataSource = null, removeDataSource = false) {
  try {

    const body = {
      data: {
        content,
        locale,
      }
    }

    if (dataSource) {
      body.data.data_sources = [dataSource];
    }

    if (removeDataSource) {
      body.data.data_sources = [];
    }

    const res = await fetch(`${BASE_URL}data-infos/${dataInfoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (res.status !== 200) {
      throw new Error(`Problem putting data info for slug: ${slug}. Returned Status: ${res.status}`);
    }

    console.log('Updated data info for: ', dataInfoId);
  } catch (error) {
    console.error("Problem updating data info for id: ", dataInfoId, error);
    throw error;
  }
}

async function createDataInfo(slug, content, dataSource = null) {
  try {
    const res = await fetch(`${BASE_URL}data-infos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          slug,
          content,
          locale,
          data_sources: dataSource ? [dataSource] : [],
        }
      }),
    });
    if (res.status !== 200) {
      throw new Error(`Problem creating data info for slug: ${slug}. Returned Status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Created data info for: ', slug);
    return data.data.id;
  } catch (error) {
    console.error("Problem creating data info for slug: ", slug, error);
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~ DataSource ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getDataSource(slug) {
  try {
    const res = await fetch(`${BASE_URL}data-sources?filters[slug][$eq]=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      throw new Error(`Problem getting data source for slug: ${slug}. Returned Status: ${res.status}`);
    }

    const jsonData = await res.json();
    if (!jsonData.data.length || jsonData.data.length > 1) {
      return null;
    }

    return jsonData.data[0].id;
  } catch (error) {
    console.error("Problem getting data source for slug: ", slug, error);
    throw error;
  }
}

async function updateDataSource(dataSourceId, title, url) {
  try {
    const res = await fetch(`${BASE_URL}data-sources/${dataSourceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title,
          url,
          locale,
        }
      }),
    });
    if (res.status !== 200) {
      throw new Error(`Problem putting data source for id: ${dataSourceId}. Returned Status: ${res.status}`);
    }
    console.log('Updated data source for: ', dataSourceId);

    const data = await res.json();
    return data.data.id;

  } catch (error) {
    console.error("Problem updating data source for id: ", dataSourceId, error);
    throw error;
  }
}

async function createDataSource(title, url = null, slug) {
  console.log("title: ", title, "url: ", url, "slug: ", slug);
  try {
    const res = await fetch(`${BASE_URL}data-sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title,
          url,
          slug,
        }
      }),
    });
    if (res.status !== 200) {
      throw new Error(`Problem creating data source for slug: ${slug}. Returned Status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Created data source for: ', slug);
    return data.data.id;
  } catch (error) {
    console.error("Problem creating data source for slug: ", slug, error);
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~ Layers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getLayers(title) {
  try {
    const res = await fetch(`${BASE_URL}layers?filters[title][$eq]=${title}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      throw new Error(`Problem getting layer for title: ${title}. Returned Status: ${res.status}`);
    }

    const jsonData = await res.json();
    if (!jsonData.data.length || jsonData.data.length > 1) {
      return null;
    }

    return jsonData.data[0].id;
  } catch (error) {
    console.error("Problem getting layer for title: ", title, error);
    throw error;
  }
}

async function updateLayer(layerId, metadata, title = null) {
  const body = {
    data: {
      locale,
      metadata: {
        ...metadata
      },
    }
  }
  if (title) {
    body.data.title = title;
  }

  try {
    const res = await fetch(`${BASE_URL}layers/${layerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (res.status !== 200) {
      throw new Error(`Problem putting layer for id: ${layerId}. Returned Status: ${res.status}`);
    }
    console.log('Updated layer for: ', layerId);

  } catch (error) {
    console.error("Problem updating layer for id: ", layerId, error);
    throw error;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~ Datasets ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function getDatasets(slug) {
  try {
    const res = await fetch(`${BASE_URL}datasets?filters[slug][$eq]=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      throw new Error(`Problem getting dataset for slug: ${slug}. Returned Status: ${res.status}`);
    }

    const jsonData = await res.json();
    if (!jsonData.data.length || jsonData.data.length > 1) {
      return null;
    }

    return jsonData.data[0].id;
  } catch (error) {
    console.error("Problem getting dataset for slug: ", slug, error);
    throw error;
  }
}

async function updateDataset(datasetId, name) {
  try {
    const res = await fetch(`${BASE_URL}datasets/${datasetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          name,
          locale,
        }
      }),
    });
    if (res.status !== 200) {
      throw new Error(`Problem putting dataset for id: ${datasetId}. Returned Status: ${res.status}`);
    }
    console.log('Updated dataset for: ', datasetId);

  } catch (error) {
    console.error("Problem updating dataset for id: ", datasetId, error);
    throw error;
  }
}

async function update() {
  await login();
  updateList.forEach(async (item) => {
    console.log("updating: ", Object.entries(item)[0]);

    let sourceId = null;
    if (item.dataSourceSlug) {
      sourceId = await getDataSource(item.dataSourceSlug);
      if (!sourceId) {
        sourceId = await createDataSource(item.dataSourceTitle, item.dataSourceUrl, item.dataSourceSlug);
      } else {
        sourceId = await updateDataSource(sourceId, item.dataSourceTitle, item.dataSourceUrl);
      }
    }

    if (item.dataInfoSlug) {
      const dataInfoId = await getDataInfo(item.dataInfoSlug);
      dataInfoId ?
        await updateDataInfo(dataInfoId, item.content, sourceId) :
        await createDataInfo(item.dataInfoSlug, item.content, sourceId);
    }

    if (item.layerTitle) {
      const layerId = await getLayers(item.layerTitle);
      layerId ?
        await updateLayer(layerId, item.metadata, item.updatedLayerTitle ? item.updatedLayerTitle : null) :
        console.log("Layer not found: ", item.layerTitle);
    }

    if (item.datasetSlug) {
      const datasetId = await getDatasets(item.datasetSlug);
      datasetId ?
        await updateDataset(datasetId, item.datasetName) :
        console.log("Dataset not found: ", item.datasetSlug);
    }
  });
}

update();


// login();
// console.log(updateList[14])
// const item = updateList[14];
// const layerId = await getLayers(item.layerTitle);
// layerId ?
//   await updateLayer(layerId, item.metadata, item.updatedLayerTitle ? item.updatedLayerTitle : null) :
//   console.log("Layer not found: ", item.layerTitle);