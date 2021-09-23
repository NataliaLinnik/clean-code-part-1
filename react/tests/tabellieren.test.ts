import tabellieren from '../src/createTable'

const csvInput = [
  "NAME; ALTER; ORT",
  "PAUL; 17; MÜNCHEN",
  "MAX; 46; KÖLN"]

const tableOutput = [
  "+----+-----+-------+",
  "|NAME|ALTER|ORT    |",
  "+----+-----+-------+",
  "|PAUL|17   |MÜNCHEN|",
  "+----+-----+-------+",
  "|Max |46   |KÖLN   |",
  "+----+-----+-------+",]


describe('Aufbau der Tabelle', function () {
  it('Aufbau der vollständigen Tabelle', function () {
    expect(tabellieren(csvInput)).toBe(tableOutput);
  });
})

describe('Genereller Aufbau der Tabelle', function () {
  it('Anzahl der Zeilen', function () {
    let eingabe_groesse = csvInput.length;
    let anzahl_zeilen = tableOutput.length;
    expect(anzahl_zeilen).toBe(eingabe_groesse * 2 + 1);
  });

  it('Anzahl der Spalten', function () {
    let woerter = csvInput[0].split(';');
    let woerter_anzahl = woerter.length;
    
    let spalten = tableOutput[0].split('+')
    let anzahl_spalten = spalten.length - 2;
    expect(woerter_anzahl).toBe(anzahl_spalten);
  });

  it('Länge der Zeilen stimmt überein', function () {
    let linien_sind_gleich
    let letzte_linie_index = 0
    for (let i = 1; i < tableOutput.length; i++) {
      linien_sind_gleich = tableOutput[letzte_linie_index].length === tableOutput[i].length
    }
    expect(linien_sind_gleich).toBe(true);
  });
})

describe('Aufbau der Trennlinien', function () {
  it('Aufbau der Linie nach Muster', function () {
    const regex = /(([\+])\-*)*[\+]/g
    const erste_linie_nach_regex_regel = regex.test(tableOutput[0]);
    
    expect(erste_linie_nach_regex_regel).toBe(true);
  });

  it('Tabelle Linien sind gleich', function () {
    let letzte_linie_index = 0
    let linien_sind_gleich
    for (let i = 0; i < tableOutput.length; i++) {
      if (i % 2 === 0) {
        linien_sind_gleich = tableOutput[i] === tableOutput[letzte_linie_index]
        continue
      }
    }
    expect(linien_sind_gleich).toBe(true);
  });
})

describe('Aufbau der Daten innerhalb der Tabelle', function () {
  it('Kopfzeile beinhaltet Überschriften', function () {
    let zeile_beinhaltet_ueberschriften

    let ueberschriften = csvInput[0].split(';');
    for (const ueberschrift of ueberschriften) { 
      zeile_beinhaltet_ueberschriften = tableOutput[1].includes(ueberschrift.trim())
    }
    
    expect(zeile_beinhaltet_ueberschriften).toBe(true);
  });

  it('Datenzeilen sind nach Schema aufgebaut', function () {
    const regex = /([\|]([A-Z]*)(\s*))*/g

    let daten_format_stimmt
    for (let i = 1; i < tableOutput.length; i++) {
      if (i % 2 !== 0) {
        daten_format_stimmt = regex.test(tableOutput[i]);
        continue
      }
    }
    expect(daten_format_stimmt).toBe(true);
  });
})

export {}