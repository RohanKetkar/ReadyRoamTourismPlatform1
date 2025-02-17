using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Tourism.Entities;
namespace Tourism.Context
{
    public class ApplicationDBContext : DbContext
    {
        public DbSet<MyPackage> packages {  get; set; }
        public DbSet<BookingDetails> bookingDetails { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Payment> Payments { get; set; }

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) 
        {
        
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<BookingDetails>()
                .HasOne(d => d.myPackage)
                .WithMany(e => e.bookingDetails)
                .HasForeignKey(d => d.PkgId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<BookingDetails>()
                .HasOne(d => d.user) 
                .WithMany(u => u.bookingDetails)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<MyPackage>()
                .HasOne(d => d.state)
                .WithMany(u => u.myPackages)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<State>()
                .HasOne(d => d.Country)
                .WithMany(u => u.states)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(role => role.ToString(),
                 role => Enum.Parse<UserRole>(role));

            modelBuilder.Entity<Payment>(entity =>
            {
                // Required fields
                entity.Property(e => e.nameOfPackage)
                      .IsRequired(); // Ensures NameOfPackage is required

                entity.Property(e => e.price)
                      .HasColumnType("decimal(18,2)"); // Ensures Price uses decimal data type with precision 18, scale 2

                entity.Property(e => e.email)
                      .IsRequired() // Ensure that email is required
                      .HasMaxLength(255); // Optional: Set a max length for the email

                entity.Property(e => e.priceperperson)
                      .HasColumnType("decimal(18,2)"); // Ensure PricePerPerson uses decimal data type with precision 18, scale 2

                entity.Property(e => e.PeopleCount)
                      .IsRequired(); // Ensures PeopleCount is required

                entity.Property(e => e.PkgId)
                      .IsRequired(); // Ensures PkgId is required

                entity.Property(e => e.TID)
                      .IsRequired() // Ensures TID is required
                      .HasColumnType("bigint"); // Optional: Use bigint type for TID if it needs to be large
            });

        }
    }
}
