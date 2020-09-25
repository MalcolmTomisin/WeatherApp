export default function SortCities(a, b) {
    let localizedNameA = a.LocalizedName.toUpperCase();
    let localizedNameB = b.LocalizedName.toUpperCase();

    if (localizedNameA < localizedNameB) {
      return -1;
    }
    if (localizedNameA > localizedNameB) {
      return 1;
    }
    // names must be equal
    return 0; 
}