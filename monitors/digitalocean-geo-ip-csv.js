import { strict as assert } from 'assert';
import { fetchCsv } from '../utils/fetch';
import cidrRegex from 'cidr-regex';

export default async () => {
    const data = await fetchCsv('https://www.digitalocean.com/geo/google.csv');

    // Validate we have an array
    assert(Array.isArray(data));
    assert(data.length > 0);

    // Validate each row has valid data
    for (const row of data) {
        assert(Array.isArray(row));
        assert(row.length === 5, `Expected 5 columns, got ${JSON.stringify(row)}`);
        assert(cidrRegex({ exact: true }).test(row[0]), `Expected valid CIDR, got ${JSON.stringify(row)}`);
    }
};
