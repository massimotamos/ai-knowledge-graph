(function() {
  // PyVis defines these globally:
  //   var nodes = new vis.DataSet(...)
  //   var edges = new vis.DataSet(...)
  //   var network = new vis.Network(...)
  if (typeof nodes === "undefined" || typeof edges === "undefined" || typeof network === "undefined") {
    console.warn("Filter enhancement: nodes/edges/network not found.");
    return;
  }

  // Snapshot full datasets once
  const ALL_NODES = nodes.get();
  const ALL_EDGES = edges.get();

  function writeNodesEdges(newNodes, newEdges){
    if (typeof graph3DAdapter !== 'undefined'){
      graph3DAdapter.setData(newNodes, newEdges);
    } else {
      nodes.clear(); nodes.add(newNodes);
      edges.clear(); edges.add(newEdges);
    }
  }

  // If the custom UI fields exist, wire up operator-dependent visibility
  const opSelUI = document.getElementById('filterOperator');
  const valueInputUI = document.getElementById('value-input');
  const valueSelectUI = document.getElementById('value-select');
  if (opSelUI && valueInputUI && valueSelectUI) {
    opSelUI.addEventListener('change', () => {
      const op = opSelUI.value;
      if (op === 'contains' || op === 'not_contains' || op === 'regex' || op === 'starts' || op === 'not_starts') {
        valueInputUI.style.display = 'inline-block';
        valueSelectUI.style.display = 'none';
      } else {
        valueInputUI.style.display = 'none';
        valueSelectUI.style.display = 'inline-block';
      }
    });
    // initialize state
    opSelUI.dispatchEvent(new Event('change'));
  }

  function norm(x) { return String(x ?? ""); }
  function normL(x) { return norm(x).toLowerCase(); }

  function match(op, actual, expected) {
    const a = norm(actual);
    const e = norm(expected);
    const al = a.toLowerCase();
    const el = e.toLowerCase();

    switch (op) {
      case "eq": return a === e;
      case "neq": return a !== e;
      case "contains": return al.includes(el);
      case "not_contains": return !al.includes(el);
      case "starts": return al.startsWith(el);
      case "not_starts": return !al.startsWith(el);
      case "regex":
        try { return new RegExp(e).test(a); } catch { return false; }
      default: return false;
    }
  }

  function getSelectedValues(selectEl) {
    if (!selectEl) return [];
    // supports <select multiple>
    return Array.from(selectEl.selectedOptions || []).map(o => o.value);
  }

  function applyEnhancedFilter() {
    const itemType = document.getElementById("networkItemSelect") || document.getElementById("selectType") || null;
    const propSel  = document.getElementById("propertySelect") || document.getElementById("selectProperty") || null;
    const valSel   = document.getElementById("valueSelect") || document.getElementById("selectValue") || null;
    const opSel    = document.getElementById("filterOperator");

    const item = itemType ? itemType.value : "Edges";
    const prop = propSel ? propSel.value : "";
    const op   = opSel ? opSel.value : "eq";
    // gather values from either multi-select or the free-text field
    let vals = getSelectedValues(valSel);
    const extra = document.getElementById('value-input');
    if (extra && extra.style.display !== 'none') {
      const txt = extra.value.trim();
      if (txt) vals.push(txt);
    }

    if (!prop || vals.length === 0) return;
    if (item === "Edges") {
      const filteredEdges = ALL_EDGES.filter(e => vals.some(v => match(op, e[prop], v)));

      // Keep only nodes touched by remaining edges
      const keep = new Set();
      filteredEdges.forEach(e => { keep.add(e.from); keep.add(e.to); });

      const filteredNodes = ALL_NODES.filter(n => keep.has(n.id));

      writeNodesEdges(filteredNodes, filteredEdges);
    } else {
      const filteredNodes = ALL_NODES.filter(n => vals.some(v => match(op, n[prop], v)));

      // Keep edges whose endpoints remain
      const keep = new Set(filteredNodes.map(n => n.id));
      const filteredEdges = ALL_EDGES.filter(e => keep.has(e.from) && keep.has(e.to));

      writeNodesEdges(filteredNodes, filteredEdges);
    }
  }

  function resetEnhancedFilter() {
    writeNodesEdges(ALL_NODES, ALL_EDGES);
  }

  // Hook the existing Filter / Reset buttons (IDs vary slightly across PyVis templates)
  const filterBtn = document.getElementById("filterButton") || document.querySelector("button#filter, button[data-action='filter']");
  const resetBtn  = document.getElementById("resetButton")  || document.querySelector("button#reset, button[data-action='reset']");

  if (filterBtn) {
    filterBtn.addEventListener("click", function(ev) {
      // override default handler if present
      ev.preventDefault();
      ev.stopPropagation();
      applyEnhancedFilter();
    }, true);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      resetEnhancedFilter();
    }, true);
  }
})();