export function deflattener(json: any) {
  return deflattenerHelper(json, json.data.hierarchy.root);
}

function deflattenerHelper(json: any, key: string) {
  const data = json.data.data;
  const childrenKeys: string[] = json.data.hierarchy.structure[key];

  const out: any = { ...data[key].fields, tag: data[key].tag };

  if (childrenKeys && childrenKeys instanceof Array && childrenKeys.length > 0) {
    const subdocuments: any[] = childrenKeys.map((childKey: string) => deflattenerHelper(json, childKey));

    subdocuments.forEach((doc: any) => {
      if (doc.hasOwnProperty('sequence')) {
        const childArrayName = `${doc.tag}s`

        if (!out.hasOwnProperty(childArrayName) || !(out[childArrayName] instanceof Array)) {
          out[childArrayName] = [];
        }
        out[childArrayName].push(doc);

      } else {
        out[doc.tag] = doc;
      }
    });
  }

  return out;
}

export function errorCode(response: any): string {
  const error: string[] = response.ret[0].split("::")
  return error[0]
}
