export function toRupiah(input: string) :string {
       const amount = parseFloat(input);

       if (isNaN(amount)) {
            return "Rp. 0"
       }
   
       return new Intl.NumberFormat('id-ID', {
           style: 'currency',
           currency: 'IDR',
           minimumFractionDigits: 0,
           maximumFractionDigits: 0
       }).format(amount);
} 