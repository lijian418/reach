export function pageNumber(total,limit,offset){
  return offset >= total ? -1 : parseInt(offset / limit) + 1;
}
